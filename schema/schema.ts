import { GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql"

const BookType = new GraphQLObjectType({
    name : "Book",
    fields: () => ({
        id : {
            type: GraphQLString
        },
        title : {
            type: GraphQLString
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields : {
        book : {
            type : BookType,
            args : {id : {type:GraphQLString}},
            resolve(parent,args) { 
                return {
                    id:'1',
                    title : 'The Book'
                }
            }
        }
    }
})

export default new GraphQLSchema({
    query : RootQuery
})