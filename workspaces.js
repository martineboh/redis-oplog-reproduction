import { Mongo } from 'meteor/mongo';
import { Users } from './users';
import { Random } from 'meteor/random'

export const Workspaces = new Mongo.Collection('workspaces');

export const addMember = new ValidatedMethod({
  name: 'workspace.addMember',
  validate: null,
  run() {
    if (Meteor.isServer) {
      const userId = Users.insert({ _id: Random.id() });
      const workspace = Workspaces.findOne();
      const members = _.union(workspace.members, [userId]);
      Workspaces.update(workspace._id, { $addToSet: { members: userId }});
    }
  },
});

export const resetWorkspace = new ValidatedMethod({
  name: 'workspace.reset',
  validate: null,
  run() {
    if (Meteor.isServer) {
      Users.remove({});
      const workspace = Workspaces.findOne();
      Workspaces.update(workspace._id, { $set: { members: [] }});
    }
  }
});