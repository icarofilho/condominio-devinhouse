import Habitante from "../models/Habitante";
import { removeAccents } from "../utils/transformacoes";
import { Op } from "sequelize";
import { mesesDoAno } from "../utils/constantes";
import { numberCheck } from "../utils/checagem";

module.exports = {
  //! SOLICITADO PELO CLIENTE
  //* Listar todos os habitantes
  async index(_, res) {
    try {
      const allHabitants = await Habitante.findAll({
        attributes: ["id", "nome"],
      });
      return res.status(200).json({ habitantes: allHabitants });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  async show(req, res) {
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

      habitante && res.status(200).json({ habitante });
      !habitante && res.status(404).json({ error: "Nenhum habitante encontrado com ID fornecido" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  //! SOLICITADO PELO CLIENTE
  //* Listar todos os habitantes por nome | mes
  async showFiltered(req, res) {
    try {
      const { nome, sobrenome, mes } = req.query;
      if (nome) {
        const habitantes = await Habitante.findAll({
          where: { nome: nome },
          attributes: ["id", "nome"],
        });
        habitantes && res.status(200).json({ habitantes });
        !habitantes && res.status(404).json({ error: "Nenhum habitante com o nome fornecido" });
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
      return res.status(400).json({ error: error.message });
    }
  },
  //! SOLICITADO PELO CLIENTE
  //* Listar todos os habitantes baseado na idade
  async showByAge(req, res) {
    try {
      const { age } = req.params;

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

      return res.status(200).json({ habitantes });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  //! SOLICITADO PELO CLIENTE
  //* Cadastrar habitante
  async store(req, res) {
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
      return res.status(201).json({ message: "Morador cadastrado com sucesso", data: habitante });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  async destroy(req, res) {
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
      return res.status(200).json({ message: "Morador removido com sucesso" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};
