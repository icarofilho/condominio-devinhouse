const sequelize = require("sequelize");
import Habitante from "../models/Habitante";
import { removeAccents } from "../utils/transformacoes";
import { Op } from "sequelize";
import { mesesDoAno } from "../utils/constantes";
import { numberCheck } from "../utils/checagem";
import { logger } from "../config/logger";

module.exports = {
  async index(_, res) {
    /* 
    #swagger.tags=["Habitantes-solicitado"]
    #swagger.description='Retorna apenas o ID e o Nome de todos os moradores do condominio'
    */
    try {
      const allHabitants = await Habitante.findAll({
        attributes: ["id", "nome"],
      });
      logger.info(`Listando todos os habitantes`);
      return res.status(200).json({ habitantes: allHabitants });
    } catch (error) {
      logger.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  },
  async show(req, res) {
    /* 
    #swagger.tags=["Habitantes-solicitado"]
    #swagger.description='Retorna detalhes do morador baseado em seu ID.'
    #swagger.parameters['id']={"in":"path","name":"id","description":"ID do morador","required":true,"type":"integer"}
    */
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error("Id não informado");
      }
      if (isNaN(id)) {
        throw new Error("Id precisa ser um valor numérico");
      }

      const habitante = await Habitante.findByPk(id, {
        attributes: {
          exclude: "id",
        },
      });

      if (habitante) {
        logger.info(`Listando o habitante ${habitante.nome}`);
        return res.status(200).json({ habitante });
      }

      if (!habitante) {
        throw new Error("Nenhum habitante encontrado com ID fornecido");
      }
    } catch (error) {
      logger.error(`Erro na aplicação: ${error.message} - status: 400`);
      return res.status(400).json({ error: error.message });
    }
  },

  async showFiltered(req, res) {
    /* 
    #swagger.tags=["Habitantes-solicitado"]
    #swagger.description='Retorna o ID e o nome dos habitantes baseado nos filtros informados - Nome ou sobrenome ou mês de nascimento'
    #swagger.parameters['nome']={"in": "query", "name": "nome", "description": "Nome do habitante", "type": "string", "required": false}
    #swagger.parameters['sobrenome']={"in": "query", "name": "sobrenome", "description": "Sobrenome do habitante", "type": "string", "required": false}
    #swagger.parameters['mes']={"in": "query", "name": "mes", "description": "Mês de nascimento do habitante", "type": "string|| number", "required": false}
    */
    try {
      const { nome, sobrenome, mes } = req.query;
      if (nome) {
        const habitantes = await Habitante.findAll({
          where: { nome: nome },
          attributes: ["id", "nome"],
        });

        if (habitantes) {
          logger.info(`Listando os habitantes com nome ${habitantes.nome}`);
          return res.status(200).json({ habitantes });
        }

        if (!habitantes) {
          throw new Error("Nenhum habitante com o nome fornecido");
        }
      }
      if (sobrenome) {
        const habitantes = await Habitante.findAll({
          where: { sobrenome: sobrenome },
          attributes: ["id", "nome"],
        });
        habitantes && res.status(200).json({ habitantes });
        !habitantes &&
          res.status(404).json({ error: "Nenhum habitante com o sobrenome fornecido" });
      }
      if (mes) {
        const monthToCompare = isNaN(mes)
          ? mesesDoAno.indexOf(removeAccents(mes.toLowerCase())) + 1
          : Number(mes);
        console.log("compare", monthToCompare);
        console.log(mes);
        const findHabitants = [];
        const allHabitants = await Habitante.findAll({
          attributes: ["id", "nome", "data_nascimento"],
        });
        allHabitants.forEach((habitant) => {
          const month = habitant.dataValues.data_nascimento.split("-")[1];
          habitant.dataValues.mes = Number(month);
          if (monthToCompare === habitant.dataValues.mes) findHabitants.push(habitant);
        });

        if (findHabitants.length <= 0) {
          throw new Error("Nenhum habitante encontrado com o mes fornecido");
        }
        findHabitants.forEach((h) => {
          delete h.dataValues.mes;
          delete h.dataValues.data_nascimento;
        });
        return res.status(200).json({ habitantes: findHabitants });
      }
    } catch (error) {
      logger.error(`${error.message} - status: 400`);
      return res.status(400).json({ error: error.message });
    }
  },
  
  async showByAge(req, res) {
    /* 
    #swagger.tags=["Habitantes-solicitado"]
    #swagger.description='Retorna o ID e o nome dos moradores com a idade igual ou superior a informada'
    #swagger.parameters['age']={type: 'integer', description: 'Idade do habitante', required: true}
    
    */
    try {
      const { age } = req.params;
      console.log('idade => ',age)
      if (isNaN(age)) {
        throw new Error("Idade deve ser um número");
      }

      const dateToCompare = new Date();
      const [year, month, day] = dateToCompare.toISOString().split("T")[0].split("-");
      const born_date = `${Number(year) - Number(age)}-${month}-${day}`;

      const habitantes = await Habitante.findAll({
        where: { data_nascimento: { [Op.lte]: born_date } },
        attributes: ["id", "nome"],
      });
      logger.info(`Listando ${habitantes.length} habitantes com idade igual ou superior a ${age}`);
      return res.status(200).json({ habitantes });
    } catch (error) {
      logger.error(error.message, " status: 400");
      return res.status(400).json({ error: error.message });
    }
  },
  
  async store(req, res) {
    /* 
    #swagger.tags=["Habitantes-solicitado"]
    #swagger.description='Cadastra um novo morador no sistema'
    #swagger.parameters['body']={"in": "body", "description": "todos os campos devem ser preenchidos",schema:{
      $nome:"Katarina",
      $sobrenome: "noxus",
      $data_nascimento: "1985-02-02",
      $cpf: "12345678901",
      $renda:"9800"
    }}
    */
    const camposRequeridos = [];
    try {
      const { nome, sobrenome, data_nascimento, renda, cpf } = req.body;

      Object.keys(req.body).forEach((key) => {
        if (!req.body[key]) camposRequeridos.push(key);
      });
      if (camposRequeridos.length > 0) {
        throw new Error(`Os campos ${camposRequeridos.join(", ")} são obrigatórios`);
      }

      if (numberCheck(nome) || numberCheck(sobrenome)) {
        throw new Error("Nome e sobrenome não devem conter números");
      }
      if (cpf.length < 11 || cpf.length > 11) {
        throw new Error("CPF inválido - CPF deve conter 11 dígitos");
      }
      const cpfExists = await Habitante.findOne({
        where: { cpf },
      });
      if (cpfExists) {
        throw new Error("CPF já cadastrado");
      }
      const habitante = await Habitante.create({
        nome,
        sobrenome,
        data_nascimento,
        renda,
        cpf,
        created_at: new Date(),
        updated_at: new Date(),
      });
      logger.info(`Habitante ${habitante.nome} cadastrado com sucesso`);
      return res.status(201).json({ message: "Morador cadastrado com sucesso", data: habitante });
    } catch (error) {
      logger.error(`${error.message} - status : 400`);
      return res.status(400).json({ error: error.message });
    }
  },
  async destroy(req, res) {
    /* 
    #swagger.tags=["Habitantes-solicitado"]
    #swagger.description='Deleta um morador do sistema baseado em seu ID'
    #swagger.parameters['id']={"in":"path","name":"id","description":"ID do morador","required":true,"type":"integer"}
    */
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error("Id não informado");
      }
      if (isNaN(id)) {
        throw new Error("Id precisa ser um valor numérico");
      }
      const habitante = await Habitante.destroy({
        where: {
          id,
        },
      });
      if (!habitante) {
        throw new Error("Nenhum morador encontrado com o id fornecido");
      }
      logger.info(`Habitante ${habitante.nome} deletado com sucesso`);
      return res.status(200).json({ message: "Morador removido com sucesso" });
    } catch (error) {
      logger.error(`${error.message} - status: 400`);
      return res.status(400).json({ error: error.message });
    }
  },
  //! renda todos habitantes
  async income(_, res) {
    try {
      const income = await Habitante.findOne({
        attributes: [sequelize.fn("SUM", sequelize.col("renda"))],
        raw: true,
      });

      logger.info("Listando o somatório das rendas");
      return res.status(200).json({ income: Number(income.sum) });
    } catch (error) {
      logger.error(error.message, " status: 400");
      return res.status(400).json({ error: error.message });
    }
  },
};
