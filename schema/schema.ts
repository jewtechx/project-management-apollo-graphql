import { GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql"
import { parentPort } from "worker_threads"

const books = [
    {title : "MyBook", id : '1', genre : "thriller", authorId : "1"},
    {title : "Nat King Cole", id : '2', genre : "history", authorId : "2"},
    {title : "Python", id : '3', genre : "coding", authorId : "3"},
    {title : "The 100", id : '4', genre : "thriller", authorId : "4"},
]

const authors = [
{    name : 'Dale', age : 75 , rating : 5 , id : 1},
{    name : 'Dale', age : 75 , rating : 5 , id : 2},
{    name : 'Dale', age : 75 , rating : 5 , id : 3},
{    name : 'Dale', age : 75 , rating : 5 , id : 4}
]

const BookType = new GraphQLObjectType({
    name : "Book",
    fields: () => ({
        id : {
            type: GraphQLString
        },
        title : {
            type: GraphQLString
        },
        author: {
            type : AuthorType,
            resolve(parent,args){
                // parent.authorId
                return authors.filter(a => a.id == parent.authorId)[0]
            }
        }
    })
})


const AuthorType:GraphQLObjectType = new GraphQLObjectType({
    name:"Author",
    fields : () => ({
        id : {
            type : GraphQLString,
        },
        name :  {
            type : GraphQLString
        },
        rating : {
            type : GraphQLString
        },
        books : {
            type : new GraphQLList(BookType),
            resolve(parent,args){
                return books.filter((b) => b.authorId == parent.id)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields : {
        book : {
            type : BookType,
            args : {id : {type:GraphQLString}},
            resolve(parent,{id}) { 
                return books.filter((b:any) => b.id === id)[0]
            }
        },
        author : {
            type : AuthorType,
            args : {id : {type:GraphQLString}},
            resolve(parent, {id}) {
                return authors.filter((a) => a.id == id)[0]
            }
        }
    }
})

export default new GraphQLSchema({
    query : RootQuery
})