const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

var id = 1;
const getId = () => '' + id++;
var PROJECTS = [];
var USERS = [];

const makeUser = (attrs) => {
  var user = Object.assign({}, attrs, { id: getId() });
  USERS.push(user);
  return user;
};

const userBy = (prop, val) => USERS.filter(u => u[prop] === val)[0];

const makeProject = attrs => {
  var proj = Object.assign({}, attrs, { id: getId(), conversations: [] });
  PROJECTS.push(proj);
  return proj;
};

const projectById = id => PROJECTS.filter(p => p.id === id)[0];

const makeTask = (attrs, proj) => {
  if (typeof proj === 'string') proj = projectById(proj);
  var task = Object.assign({}, attrs, { id: getId(), messages: [] });
  proj.conversations.push(task);
  return task;
};

const taskById = id => {
  return PROJECTS.reduce((task, nextProj) => {
    return task || nextProj.conversations.filter(t => t.id === id)[0];
  }, null);
}

const makeMessage = (attrs, task, user) => {
  if (typeof task === 'string') task = taskById(task);
  if (!user) user = userBy('username', attrs.username);

  var msg = Object.assign({}, attrs, { id: getId(), username: user.username, avatar: user.avatar });
  task.messages.push(msg);
  return msg;
};

const authenticateLogin = ({ username, password }) => {
  let user = USERS.filter(u => u.username === username)[0];
  return (user && user.password === password) ? user : false;
};

// INITIAL DATA
var u1 = makeUser({ username: 'eddie', password: 'eddie', avatar: 'https://randomuser.me/api/portraits/men/91.jpg' });
var u2 = makeUser({ username: 'april', password: 'april', avatar: 'https://randomuser.me/api/portraits/women/31.jpg' });
var u3 = makeUser({ username: 'jimmy', password: 'jimmy', avatar: 'https://randomuser.me/api/portraits/men/67.jpg' });
var u3 = makeUser({ username: 'linn',  password: 'linn',  avatar: 'https://randomuser.me/api/portraits/women/47.jpg' });

var p1 = makeProject({ users: ['jimmy', 'eddie', 'april', 'linn'], name: 'Foobar App', description: 'Codename: The Killer App' });
var t1 = makeTask({ name: 'UI Design' }, p1);
makeMessage({ text: 'How are the mockups coming?' }, t1, u1);
makeMessage({ text: 'Looking pretty good! Linn has come up with some great stuff.' }, t1, u2);
makeMessage({ text: 'Aw, thanks! :)' }, t1, u3);
var t2 = makeTask({ name: 'Weekly Meeting Oct. 24' }, p1);

var p2 = makeProject({ users: ['jimmy', 'eddie', 'april', 'linn'], name: 'Client XYZ Project', description: 'The one about the thing.' });
var t3 = makeTask({ name: 'Task B1' }, p2);
var t4 = makeTask({ name: 'Task B2' }, p2);

var p3 = makeProject({ users: ['eddie', 'april', 'linn'], name: 'Annual Company Dinner', description: 'Not McDonalds Again' });
var t3 = makeTask({ name: 'Task C1' }, p3);
var t4 = makeTask({ name: 'Task C1' }, p3);

router.route('/projects')
  .get((req, res) => res.status(200).json(PROJECTS))
  .post((req, res) => res.status(200).json(makeProject(req.body)));

router.route('/projects/:id')
  .get((req, res) => res.status(200).json(projectById(req.params.id)));

router.route('/projects/:id/conversations')
  .post((req, res) => res.status(200).json(makeTask(req.body, req.params.id)));

router.route('/conversations/:id')
  .get((req, res) => res.status(200).json(taskById(req.params.id)));

router.route('/conversations/:id/messages')
  .post((req, res) => res.status(200).json(makeMessage(req.body, req.params.id)));

router.route('/users')
  .get((req, res) => res.status(200).json(USERS));

router.route('/login')
  .post((req, res) => res.status(200).json(authenticateLogin(req.body)));

app
  .use(bodyParser.json())
  .use('/api', router).listen(9876);
