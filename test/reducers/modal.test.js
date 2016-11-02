import { CHANGE_MODAL } from '../../src/constants/actionTypes';
import modal from '../../src/reducers/modal';


describe('modal reducer', () => {
    it('should return the initial state', () => {
        expect(modal(undefined, {})).to.equal(0);
    });


    it('should return a modal number', () => {
        expect(modal(1, { type: CHANGE_MODAL, modal: 2 })).to.equal(2);
    });
});
