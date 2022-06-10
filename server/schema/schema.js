const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull} = require("graphql");
const Lecteur = require("../models/Lecteur");

const LecteurType = new GraphQLObjectType({
    name: "Lecteur",
    fields: ()=>({
        id: { type: GraphQLID},
        nom: { type: GraphQLString},
        prenom: { type: GraphQLString},
        image: { type: GraphQLString},
        numero: { type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        //list de tous les lecteurs
        lecteurs: {
            type: new GraphQLList(LecteurType),
            resolve(parent, args){
                return Lecteur.find()
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        //ajouter lecteur
        addLecteur: {
            type: LecteurType,
            args: {
                numero: { type: GraphQLNonNull(GraphQLString)},
                nom: { type: GraphQLNonNull(GraphQLString)},
                prenom: { type: GraphQLNonNull(GraphQLString)},
                image: { type: GraphQLString},
            },
            resolve(parent, args){
                const lecteur = new Lecteur({
                    numero: args.numero,
                    nom: args.nom,
                    prenom: args.prenom,
                    image: args.image,
                });
                return lecteur.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})