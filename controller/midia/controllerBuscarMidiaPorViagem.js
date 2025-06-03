/**
 * Objetivo: Função para buscar mídias associadas a uma viagem específica
 * Data: 03/06/2025
 * Dev: Giovanna
 * Versão: 1.1
 */

 const midiaDAO = require('../../model/dao/midia.js');
 const MESSAGE = require('../../modulo/config.js');
 
 const buscarMidiaPorViagem = async function (idViagem) {
     try {
         if (!idViagem || isNaN(idViagem) || idViagem <= 0) {
             return MESSAGE.ERROR_REQUIRE_FIELDS; // 400
         }
 
         const resultado = await midiaDAO.selectMidiaByIdViagem(idViagem);
 
         if (resultado && resultado.length > 0) {
             return {
                 status: true,
                 status_code: 200,
                 midia: resultado
             };
         } else {
             return {
                 ...MESSAGE.ERROR_NOT_FOUND,
                 midia: []
             };
         }
     } catch (error) {
         console.log(error);
         return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER; // 500
     }
 };
 
 module.exports = {
     buscarMidiaPorViagem
 };
 