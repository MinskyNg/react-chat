import * as types from '../../src/constants/actionTypes';
import * as actions from '../../src/actions';


describe('async actions', () => {
    let actionStack;
    let dispatchSpy;
    let getStateSpy;


    beforeEach(() => {
        sinon.stub(window, 'fetch');
        sinon.spy(actions.socket, 'emit');
        sinon.spy(localStorage, 'setItem');
        actionStack = [];
        dispatchSpy = sinon.spy(action => {
            actionStack.push(action);
        });
    });


    afterEach(() => {
        window.fetch.restore();
        actions.socket.emit.restore();
        localStorage.setItem.restore();
        dispatchSpy.reset();
    });


    describe('signin', () => {
        it('should return a function (is a thunk)', () => {
            expect(actions.signin()).to.be.a('function');
        });

        it('should signin successfully', (done) => {
            const res = new window.Response(JSON.stringify({
                success: true, user: { username: 'user' }
            }), {
                status: 200,
                headers: { 'Content-type': 'application/json' },
            });
            window.fetch
                .onCall(0)
                .returns(Promise.resolve(res));
            actions.signin({ username: 'user' }, true)(dispatchSpy)
                .then(() => {
                    expect(localStorage.setItem.calledWith('user', JSON.stringify({ username: 'user' }))).to.be.true;
                    expect(localStorage.setItem.callCount).to.equal(1);
                    expect(actionStack[0]).to.have.property('type', types.CHANGE_WARNING);
                    done();
                });
        });
    });


    describe('signup', () => {
        it('should return a function (is a thunk)', () => {
            expect(actions.signup()).to.be.a('function');
        });
    });


    describe('signout', () => {
        it('should return a function (is a thunk)', () => {
            expect(actions.signout()).to.be.a('function');
        });
    });


    describe('updateProfile', () => {
        it('should return a function (is a thunk)', () => {
            expect(actions.updateProfile()).to.be.a('function');
        });
    });


    describe('fetchUsers', () => {
        it('should return a function (is a thunk)', () => {
            expect(actions.fetchUsers()).to.be.a('function');
        });
    });


    describe('fetchGroups', () => {
        it('should return a function (is a thunk)', () => {
            expect(actions.fetchGroups()).to.be.a('function');
        });
    });


    describe('createGroup', () => {
        it('should return a function (is a thunk)', () => {
            expect(actions.createGroup()).to.be.a('function');
        });
    });


    describe('joinGroup', () => {
        it('should return a function (is a thunk)', () => {
            expect(actions.joinGroup()).to.be.a('function');
        });
    });


    describe('privateChat', () => {
        it('should return a function (is a thunk)', () => {
            expect(actions.privateChat()).to.be.a('function');
        });
    });


    describe('sendMsg', () => {
        it('should return a function (is a thunk)', () => {
            expect(actions.sendMsg()).to.be.a('function');
        });
    });
});
