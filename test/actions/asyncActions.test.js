import { Map, List } from 'immutable';
import * as actions from '../../src/actions';


describe('async actions', () => {
    let actionStack;
    let dispatchSpy;
    let getStateStub;


    beforeEach(() => {
        sinon.stub(window, 'fetch');
        sinon.spy(localStorage, 'setItem');
        actionStack = [];
        dispatchSpy = sinon.spy(action => {
            actionStack.push(action);
        });
        getStateStub = sinon.stub();
    });


    afterEach(() => {
        window.fetch.restore();
        localStorage.setItem.restore();
        getStateStub.reset();
        dispatchSpy.reset();
    });


    describe('signin', () => {
        it('should return a function (is a thunk)', () => {
            expect(actions.signin()).to.be.a('function');
        });

        it('should signin successfully', () => {
            const user = { username: 'user' };
            const res = new window.Response(JSON.stringify({
                success: true, user
            }), {
                status: 200,
                headers: { 'Content-type': 'application/json' },
            });
            window.fetch
                .onCall(0)
                .returns(Promise.resolve(res));
            return actions.signin(user, true)(dispatchSpy)
                .then(() => {
                    expect(localStorage.setItem.calledWith('user', JSON.stringify(user))).to.be.true;
                    expect(localStorage.setItem.callCount).to.equal(1);
                    expect(actionStack[0]).to.have.property('warning', '');
                    expect(actionStack[1]).to.have.deep.property('user.username', user.username);
                });
        });

        it('should signin unsuccessfully', () => {
            const user = { username: 'user' };
            const res = new window.Response(JSON.stringify({
                success: false, msg: 'err'
            }), {
                status: 200,
                headers: { 'Content-type': 'application/json' },
            });
            window.fetch
                .onCall(0)
                .returns(Promise.resolve(res));
            return actions.signin(user, true)(dispatchSpy)
                .then(() => {
                    expect(localStorage.setItem.called).to.be.false;
                    expect(actionStack[0]).to.have.property('user', null);
                    expect(actionStack[1]).to.have.property('warning', 'err');
                });
        });

        it('should catch an Error', () => {
            window.fetch
                .onCall(0)
                .returns(Promise.resolve(() => {}));
            return actions.signin({}, true)(dispatchSpy);
        });
    });


    describe('signup', () => {
        it('should return a function (is a thunk)', () => {
            expect(actions.signup()).to.be.a('function');
        });

        it('should signup successfully', () => {
            const user = { username: 'user' };
            const res = new window.Response(JSON.stringify({
                success: true, user
            }), {
                status: 200,
                headers: { 'Content-type': 'application/json' },
            });
            window.fetch
                .onCall(0)
                .returns(Promise.resolve(res));
            return actions.signup(user, true)(dispatchSpy)
                .then(() => {
                    expect(localStorage.setItem.calledWith('user', JSON.stringify(user))).to.be.true;
                    expect(localStorage.setItem.callCount).to.equal(1);
                    expect(actionStack[0]).to.have.property('warning', '');
                    expect(actionStack[1]).to.have.deep.property('user.username', user.username);
                });
        });

        it('should signup unsuccessfully', () => {
            const user = { username: 'user' };
            const res = new window.Response(JSON.stringify({
                success: false, msg: 'err'
            }), {
                status: 200,
                headers: { 'Content-type': 'application/json' },
            });
            window.fetch
                .onCall(0)
                .returns(Promise.resolve(res));
            return actions.signup(user, true)(dispatchSpy)
                .then(() => {
                    expect(localStorage.setItem.called).to.be.false;
                    expect(actionStack[0]).to.have.property('user', null);
                    expect(actionStack[1]).to.have.property('warning', 'err');
                });
        });

        it('should catch an Error', () => {
            window.fetch
                .onCall(0)
                .returns(Promise.resolve(() => {}));
            return actions.signup({}, true)(dispatchSpy);
        });
    });


    describe('signout', () => {
        it('should return a function (is a thunk)', () => {
            expect(actions.signout()).to.be.a('function');
        });

        it('should signout', () => {
            actions.signout()(dispatchSpy);
            expect(localStorage.setItem.calledWith('user', JSON.stringify(null))).to.be.true;
            expect(actionStack[0]).to.have.property('user', null);
        });
    });


    describe('updateProfile', () => {
        it('should return a function (is a thunk)', () => {
            expect(actions.updateProfile()).to.be.a('function');
        });

        it('should updateProfile successfully', () => {
            const user = { username: 'user' };
            const res = new window.Response(JSON.stringify({
                success: true
            }), {
                status: 200,
                headers: { 'Content-type': 'application/json' },
            });
            window.fetch
                .onCall(0)
                .returns(Promise.resolve(res));
            return actions.updateProfile(user)(dispatchSpy)
                .then(() => {
                    expect(actionStack[0]).to.have.property('user', user);
                });
        });

        it('should updateProfile unsuccessfully', () => {
            const user = { username: 'user' };
            const res = new window.Response(JSON.stringify({
                success: false
            }), {
                status: 200,
                headers: { 'Content-type': 'application/json' },
            });
            window.fetch
                .onCall(0)
                .returns(Promise.resolve(res));
            return actions.updateProfile(user)(dispatchSpy)
                .then(() => {
                    expect(actionStack[0]).to.have.property('warning');
                });
        });

        it('should catch an Error', () => {
            window.fetch
                .onCall(0)
                .returns(Promise.resolve(() => {}));
            return actions.updateProfile({})(dispatchSpy);
        });
    });


    describe('fetchUsers', () => {
        it('should return a function (is a thunk)', () => {
            expect(actions.fetchUsers()).to.be.a('function');
        });

        it('should fetchUsers', () => {
            const users = [];
            const res = new window.Response(JSON.stringify(users),
                {
                    status: 200,
                    headers: { 'Content-type': 'application/json' },
                });
            window.fetch
                .onCall(0)
                .returns(Promise.resolve(res));
            return actions.fetchUsers()(dispatchSpy)
                .then(() => expect(actionStack[0]).to.have.property('users'));
        });

        it('should catch an Error', () => {
            window.fetch
                .onCall(0)
                .returns(Promise.resolve(() => {}));
            return actions.fetchUsers()(dispatchSpy);
        });
    });


    describe('fetchGroups', () => {
        it('should return a function (is a thunk)', () => {
            expect(actions.fetchGroups()).to.be.a('function');
        });

        it('should fetchGroups', () => {
            const groups = [];
            const res = new window.Response(JSON.stringify(groups),
                {
                    status: 200,
                    headers: { 'Content-type': 'application/json' },
                });
            window.fetch
                .onCall(0)
                .returns(Promise.resolve(res));
            getStateStub.withArgs().returns({
                get: () => Map({
                    username: '',
                    avatar: '',
                    signature: ''
                })
            });
            return actions.fetchGroups()(dispatchSpy, getStateStub)
                .then(() => expect(actionStack[0]).to.have.property('groups'));
        });

        it('should catch an Error', () => {
            window.fetch
                .onCall(0)
                .returns(Promise.resolve(() => {}));
            return actions.fetchGroups()(dispatchSpy);
        });
    });

    describe('createGroup', () => {
        it('should return a function (is a thunk)', () => {
            expect(actions.createGroup()).to.be.a('function');
        });

        it('should create a group successfully', () => {
            const group = { name: 'group' };
            const res = new window.Response(JSON.stringify({
                success: true, group
            }), {
                status: 200,
                headers: { 'Content-type': 'application/json' },
            });
            window.fetch
                .onCall(0)
                .returns(Promise.resolve(res));
            getStateStub.withArgs().returns({
                get: () => List()
            });
            return actions.createGroup(group)(dispatchSpy, getStateStub)
                .then(() => {
                    expect(actionStack[0]).to.have.property('warning', '');
                    expect(actionStack[1]).to.have.deep.property('group.name', group.name);
                });
        });


        it('should create a group unsuccessfully', () => {
            const group = { name: 'group' };
            const res = new window.Response(JSON.stringify({
                success: false, msg: 'err'
            }), {
                status: 200,
                headers: { 'Content-type': 'application/json' },
            });
            window.fetch
                .onCall(0)
                .returns(Promise.resolve(res));
            getStateStub.withArgs().returns({
                get: () => List()
            });
            return actions.createGroup(group)(dispatchSpy, getStateStub)
                .then(() => {
                    expect(actionStack[0]).to.have.property('warning', 'err');
                });
        });


        it('should not create an existing group', () => {
            const group = { name: 'group' };
            getStateStub.withArgs().returns({
                get: () => List([Map(group)])
            });
            actions.createGroup(group)(dispatchSpy, getStateStub);
            expect(actionStack[0]).to.have.property('warning', '该群组已存在');
            expect(window.fetch.called).to.be.false;
        });

        it('should catch an Error', () => {
            const group = { name: 'group' };
            window.fetch
                .onCall(0)
                .returns(Promise.resolve(() => {}));
            getStateStub.withArgs().returns({
                get: () => List([Map(group)])
            });
            return actions.createGroup({})(dispatchSpy, getStateStub);
        });
    });


    describe('joinGroup', () => {
        it('should return a function (is a thunk)', () => {
            expect(actions.joinGroup()).to.be.a('function');
        });


        it('should change the target to a group', () => {
            const target = { private: false, name: 'target' };
            getStateStub.withArgs().returns({
                get: () => Map(target)
            });
            actions.joinGroup('group')(dispatchSpy, getStateStub);
            expect(actionStack[0].target).to.deep.equal({ private: false, name: 'group' });
        });
    });


    describe('privateChat', () => {
        it('should return a function (is a thunk)', () => {
            expect(actions.privateChat()).to.be.a('function');
        });


        it('should change the target to a user', () => {
            const target = { private: false, name: 'target' };
            getStateStub.withArgs().returns({
                get: () => Map(target)
            });
            actions.privateChat('user')(dispatchSpy, getStateStub);
            expect(actionStack[0].target).to.deep.equal({ private: true, name: 'user' });
        });
    });


    describe('sendMsg', () => {
        it('should return a function (is a thunk)', () => {
            expect(actions.sendMsg()).to.be.a('function');
        });


        it('should send a message to a group', () => {
            const msg = {
                type: 'plain',
                text: 'msgText',
                time: '20:12'
            };
            getStateStub.withArgs().returns({
                get: (state) => (
                    state === 'user' ? Map({
                        username: 'sender',
                        signature: '',
                        avatar: ''
                    }) : Map({
                        private: false,
                        name: 'group'
                    })
                )
            });
            actions.sendMsg(msg)(dispatchSpy, getStateStub);
            expect(actionStack[0].msg).to.deep.equal({
                target: 'group',
                sender: 'sender',
                type: 'plain',
                text: 'msgText',
                time: '20:12'
            });
        });


        it('should send a message to a user', () => {
            const msg = {
                type: 'plain',
                text: 'msgText',
                time: '20:12'
            };
            getStateStub.withArgs().returns({
                get: (state) => (
                    state === 'user' ? Map({
                        username: 'sender',
                        signature: '',
                        avatar: ''
                    }) : Map({
                        private: true,
                        name: 'user'
                    })
                )
            });
            actions.sendMsg(msg)(dispatchSpy, getStateStub);
            expect(actionStack[0].msg).to.deep.equal({
                target: 'user',
                sender: 'sender',
                type: 'plain',
                text: 'msgText',
                time: '20:12'
            });
        });
    });
});
