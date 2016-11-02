import { Map } from 'immutable';
import chaiImmutable from 'chai-immutable';
chai.use(chaiImmutable);
import { TOGGLE_RECEIVE, TOGGLE_SOUND, TOGGLE_NOTICE, TOGGLE_SCREEN } from '../../src/constants/actionTypes';
import settings from '../../src/reducers/settings';


describe('settings reducer', () => {
    it('should return the initial state', () => {
        expect(settings(undefined, {})).to.equal(Map({
            receive: true, sound: true, notice: true, screen: false
        }));
    });

    it('should toggle the receive settings', () => {
        expect(settings(undefined, { type: TOGGLE_RECEIVE })).to.equal(Map({
            receive: false, sound: true, notice: true, screen: false
        }));
    });

    it('should toggle the sound settings', () => {
        expect(settings(undefined, { type: TOGGLE_SOUND })).to.equal(Map({
            receive: true, sound: false, notice: true, screen: false
        }));
    });

    it('should toggle the notice settings', () => {
        expect(settings(undefined, { type: TOGGLE_NOTICE })).to.equal(Map({
            receive: true, sound: true, notice: false, screen: false
        }));
    });

    it('should toggle the screen settings', () => {
        expect(settings(undefined, { type: TOGGLE_SCREEN })).to.equal(Map({
            receive: true, sound: true, notice: true, screen: true
        }));
    });
});
