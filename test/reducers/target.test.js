import { Map } from 'immutable';
import chaiImmutable from 'chai-immutable';
chai.use(chaiImmutable);
import { CHANGE_TARGET } from '../../src/constants/actionTypes';
import target from '../../src/reducers/target';


describe('target reducer', () => {
    it('should return the initial state', () => {
        expect(target(undefined, {})).to.equal(Map({ private: false, name: 'Group' }));
    });

    it('should change target', () => {
        const newTarget = { private: true, name: 'user' };
        expect(target(undefined, {
            type: CHANGE_TARGET, target: newTarget
        })).to.equal(Map(newTarget));
    });
});
