import { CHANGE_WARNING } from '../../src/constants/actionTypes';
import warning from '../../src/reducers/warning';


describe('warning reducer', () => {
    it('should return the initial state', () => {
        expect(warning(undefined, {})).to.equal('');
    });

    it('should change warning', () => {
        expect(warning(undefined, {
            type: CHANGE_WARNING, warning: 'warning'
        })).to.equal('warning');
    });
});
