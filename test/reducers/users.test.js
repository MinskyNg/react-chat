import { fromJS, Map, List } from 'immutable';
import chaiImmutable from 'chai-immutable';
chai.use(chaiImmutable);
import { INIT_USERS, ADD_USER, REMOVE_USER, UPDATE_USER, ADD_USER_MSG, ADD_SELF_MSG } from '../../src/constants/actionTypes';
import users from '../../src/reducers/users';


describe('users reducer', () => {
    it('should return the initial state', () => {
        expect(users(undefined, {})).to.equal(List());
    });


    it('should initialize the user list', () => {
        const initUsers = [{ username: 'user', avatar: 'avatar', signature: 'signature' }];
        const nextState = users(List(), {
            type: INIT_USERS,
            users: initUsers
        });
        expect(nextState).to.equal(fromJS(initUsers));
    });


    it('should add a user to the user list', () => {
        const user = { username: 'username', avatar: '', signature: 'signature' };
        const nextState = users(List(), {
            type: ADD_USER,
            user
        });
        expect(nextState).to.equal(fromJS([user]));
    });


    it('should remove a user from the user list', () => {
        const user = { username: 'username', avatar: '', signature: 'signature' };
        const nextState = users(fromJS([user]), {
            type: REMOVE_USER,
            username: user.username
        });
        expect(nextState).to.equal(List());
    });


    it("should update a user's profile", () => {
        const user = { username: 'username', avatar: '', signature: 'signature' };
        const newUser = { username: 'username', avatar: 'avatar', signature: '' };
        const nextState = users(fromJS([user]), {
            type: UPDATE_USER,
            user: newUser
        });
        expect(nextState).to.equal(fromJS([newUser]));
    });


    it("should add a user's msg to a user", () => {
        let initUsers = [{
            username: 'target', avatar: 'avatar', signature: 'signature', msg: []
        }];
        const msg = {
            sender: 'target',
            avatar: 'avatar',
            type: 'plain',
            text: 'text',
            time: '20:13'
        };
        let nextState = users(fromJS(initUsers), {
            type: ADD_USER_MSG,
            msg
        });
        expect(nextState).to.have.deep.property([0, 'msg', 0], fromJS(msg));

        initUsers = [{
            username: 'target', avatar: 'avatar', signature: 'signature'
        }];
        nextState = users(fromJS(initUsers), {
            type: ADD_USER_MSG,
            msg
        });
        expect(nextState).to.have.deep.property([0, 'msg', 0], fromJS(msg));
    });


    it('should add a self msg to a user', () => {
        let initUsers = [{
            username: 'target', avatar: 'avatar', signature: 'signature', msg: []
        }];
        const msg = {
            target: 'target',
            sender: 'user',
            avatar: 'avatar',
            type: 'plain',
            text: 'text',
            time: '20:13'
        };
        let nextState = users(fromJS(initUsers), {
            type: ADD_SELF_MSG,
            msg
        });
        expect(nextState).to.have.deep.property([0, 'msg', 0], fromJS({
            sender: msg.sender,
            type: msg.type,
            text: msg.text,
            time: msg.time
        }));

        initUsers = [{
            username: 'target', avatar: 'avatar', signature: 'signature'
        }];
        nextState = users(fromJS(initUsers), {
            type: ADD_SELF_MSG,
            msg
        });
        expect(nextState).to.have.deep.property([0, 'msg', 0], fromJS({
            sender: msg.sender,
            type: msg.type,
            text: msg.text,
            time: msg.time
        }));
    });
});
