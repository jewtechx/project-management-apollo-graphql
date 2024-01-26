const {clients,projects} = require("../../sampleData")

// mongoose models
const Project = require("../models/Project")
const Client = require("../models/Client")

const {
  GraphQLObjectType,
  GraphQLID, 
  GraphQLString,
  GraphQLList,GraphQLSchema, GraphQLNonNull, GraphQLEnumType
} = require("graphql")

// Client type
const ClientType = new GraphQLObjectType({
  name : "clients",
  fields : () => ({
    id : {type : GraphQLID},
    name : {type : GraphQLString},
    email : {type : GraphQLString},
    phone : {type : GraphQLString}
  })
})

// project type
const ProjectType = new GraphQLObjectType({
  name : "projects",
  fields : () => ({
    id :{type : GraphQLID},
    name : {type : GraphQLString},
    description : {type : GraphQLString},
    status : {type : GraphQLString},
    clientId : {type : GraphQLID},
    client : {
      type : ClientType , 
      resolve(parent,args){
        return Client.findById(parent.clientId)
      }
    }
  })
})


const RootQuery = new GraphQLObjectType({
  name : "RootQueryType",
  fields : {
    //query to get all projects
    projects : {
      type : new GraphQLList(ProjectType),
      resolve(parent,args){
        return Project.find()
      }
    },

    //query for a single project
    project : {
      type : ProjectType,
      args : { id : {type : GraphQLID}},
      resolve(parent,args){
        return Project.findById(args.id)
      }
    },

    //query to get all clients
    clients : {
      type : new GraphQLList(ClientType),
      resolve(parent,args){
        return Client.find()
      }
    },

    //query for a single client
    client : {
      type : ClientType,
      args : { id : {type : GraphQLID}},
      resolve(parent,args){
        return Client.findById(args.id)
      }
    }
  }
})


//mutations

const mutation = new GraphQLObjectType({
    name : "Mutations",
    fields : {
      addClient : {
        type : ClientType,
        args : {
          name : {type : GraphQLNonNull(GraphQLString)},
          email : {type : GraphQLNonNull(GraphQLString)},
          phone : {type : GraphQLNonNull(GraphQLString)},
        },
        resolve(parent,args){
          const client = new Client({
            name : args.name,
            email : args.email,
            phone : args.phone,
          })

          return client.save()
        }
      },

      // delete client 
      deleteClient : {
        type : ClientType,
        args : {id : {type : GraphQLNonNull(GraphQLID)}},
        resolve(parent,args){
          return Client.findByIdAndDelete(args.id)
        }
      },


         // Add a project
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'ProjectStatus',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
          }),
          defaultValue: 'Not Started',
        },
        clientId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        });

        return project.save();
      },
    },

    // delete a project
    deleteProject : {
      type : ProjectType,
      args : {id : {type : GraphQLNonNull(GraphQLString)}},
      resolve(parent,args){
        return Project.findByIdAndDelete(args.id)
      }
    },

    // update project
    updateProject : {
      type : ProjectType,
      args : {
        id : {type : GraphQLNonNull(GraphQLString)},
        name : {type : GraphQLString},
        description : {type : GraphQLString},
        status : {
          type : new GraphQLEnumType({
            name : "ProjectUpdateStatus",
            values : {
              new : {value : "Not Started"},
              progress : {value : "In Progress"},
              completed : {value : "Completed"}
            }
          })
        }
      },
      resolve(parent,args){
        return Project.findByIdAndUpdate(
          args.id,{
            $set : {
              name : args.name,
              description : args.description,
              status : args.status
            }
          },{new : true}
        )
      }
    }
    }
})

module.exports = new GraphQLSchema({
  query : RootQuery,
  mutation
})