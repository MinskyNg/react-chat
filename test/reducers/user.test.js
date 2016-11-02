import { Map } from 'immutable';
import chaiImmutable from 'chai-immutable';
chai.use(chaiImmutable);
import { CHANGE_USER } from '../../src/constants/actionTypes';
import user from '../../src/reducers/user';


describe('user reducer', () => {
    it('should return the initial state', () => {
        expect(user(undefined, {})).to.equal(Map(null));
    });

    it('should change user', () => {
        const newUser = { username: 'username', avatar: '', signature: 'signature' };
        expect(user(undefined, {
            type: CHANGE_USER, user: newUser
        })).to.equal(Map(newUser));
    });
});
