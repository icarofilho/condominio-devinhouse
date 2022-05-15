import Despesa from '../models/Despesa';
import { logger } from "../config/logger";

module.exports ={
  async index(req,res){
    try {
      return res.json({msg:'todas as despesas'})
    } catch (error) {
      logger.error(error.message);
      return res.status(400).json({ error: error.message });
    }
  },
  async store(req,res){
    try {
      const missingFields = [];
      const {mes,ano, agua, luz, reserva,adm} = req.body

      if(!mes) missingFields.push('mes');
      if(!ano) missingFields.push('ano');
      if(!agua) missingFields.push('agua');
      if(!luz) missingFields.push('luz');
      if(!reserva) missingFields.push('reserva');
      if(!adm) missingFields.push('adm');

      if(missingFields.length > 0){
        throw new Error(`Campo(s) vazio(s): ${missingFields.join(', ')}`);
      }

      if(mes > 12 || mes < 1){
        throw new Error('Mês inválido');
      }
      
      const despesa = await Despesa.create({
        mes,
        ano,
        agua,
        luz,
        reserva,
        adm,
        total: Number(agua) + Number(luz) + Number(reserva) + Number(adm),
        created_at: new Date(),
        updated_at: new Date(),
      });

      return res.status(201).json({ message: "Despesa cadastrada com sucesso", data: despesa });
    } catch (error) {
      logger.error(error.message);
      return res.status(400).json({ error: error.message });
    }
  },
  async gastoTotal(_,res){
    try {
      
      const despesaTotal = await Despesa.sum('total');
      return res.json({ total: despesaTotal});

    } catch (error) {
      logger.error(error.message);
      return res.status(400).json({ error: error.message });
    }
      
    }
  }

