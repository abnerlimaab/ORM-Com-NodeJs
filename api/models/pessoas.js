'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    static associate(models) {
      //Associação (1, n) de Pessoas para Turmas
      Pessoas.hasMany(models.Turmas, {
        //chave estrangeira utilizada no relacionamento
        foreignKey: 'docente_id'
      })
      //Associação de Pessoas para Matrículas (1, n)
      Pessoas.hasMany(models.Matriculas, {
        //chave estrangeira utilizada no relacionamento
        foreignKey: 'estudante_id',
        //Condição passada no WHERE utilizada pelo sequelize (definição de escopo)
        scope: { status: 'confirmado' },
        //Nome do escopo
        as: 'aulasMatriculadas'
      })
    }
  };
  Pessoas.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        funcaoValidadora: function(dado) {
          if (dado.length < 3) throw new Error('O campo nome deve ter mais de três caractéres.')
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'dado do tipo e-mail inválido'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoas',
    paranoid: true,
    defaultScope: {
      where: {ativo: true}
    },
    scopes: {
      todos: { where: {}},
      
    }
  });
  return Pessoas;
};