import * as types from '../../src/constants/actionTypes';
import * as actions from '../../src/actions';


describe('actions', () => {
    it('should create an action to add a user', () => {
        const user = {
            name: 'user',
            signature: 'signature',
            avatar: 'http://7xnpxz.com1.z0.glb.clouddn.com/userdefault.png',
            msg: []
        };

        const expectedAction = {
            type: types.ADD_USER,
            user
        };

        const action = expect(actions.addUser(user));
        action.to.deep.equal(expectedAction);
        action.to.have.property('user').to.be.an('object');
    });
});
