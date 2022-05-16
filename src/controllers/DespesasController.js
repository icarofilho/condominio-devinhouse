import Despesa from "../models/Despesa";
import { logger } from "../config/logger";

module.exports = {
  async index(req, res) {
    try {
      return res.json({ msg: "todas as despesas" });
    } catch (error) {
      logger.error(error.message);
      return res.status(400).json({ error: error.message });
    }
  },
  async store(req, res) {
    try {
      const missingFields = [];
      const { mes, ano, agua, luz, reserva, adm } = req.body;
      let { extra } = req.body;

      !extra ? (extra = 0) : (extra = extra);

      if (!mes) missingFields.push("mes");
      if (isNaN(mes)){
        throw new Error("O mes deve ser um número entre 1 e 12");
      }
      if (!ano) missingFields.push("ano");
      if (!agua) missingFields.push("agua");
      if (!luz) missingFields.push("luz");
      if (!reserva) missingFields.push("reserva");
      if (!adm) missingFields.push("adm");

      if (missingFields.length > 0) {
        throw new Error(`Campo(s) vazio(s): ${missingFields.join(", ")}`);
      }

      if (mes > 12 || mes < 1) {
        throw new Error("Mês inválido");
      }

      const repetido = await Despesa.findOne({
        where: {
          mes,
          ano,
        },
      });

      if (repetido) {
        throw new Error("Mes de referência já cadastrado, para alterar entre em contato com o time de TI");
      }

      const despesa = await Despesa.create({
        mes,
        ano,
        agua,
        luz,
        reserva,
        adm,
        extra,
        total: Number(agua) + Number(luz) + Number(adm),
        caixa: Number(reserva) - Number(extra),
        created_at: new Date(),
        updated_at: new Date(),
      });

      return res.status(201).json({ message: "Despesa cadastrada com sucesso", data: despesa });
    } catch (error) {
      logger.error(error.message);
      return res.status(400).json({ error: error.message });
    }
  },
  async gastoTotal(_, res) {
    try {
      const despesaTotal = await Despesa.sum("total");
      return res.json({ total: despesaTotal });
    } catch (error) {
      logger.error(error.message);
      return res.status(400).json({ error: error.message });
    }
  },
};
