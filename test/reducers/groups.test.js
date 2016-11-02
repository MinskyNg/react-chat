import { fromJS, List } from 'immutable';
import chaiImmutable from 'chai-immutable';
chai.use(chaiImmutable);
import { INIT_GROUPS, ADD_GROUP, ADD_GROUP_MSG } from '../../src/constants/actionTypes';
import groups from '../../src/reducers/groups';


describe('groups reducer', () => {
    it('should return the initial state', () => {
        expect(groups(undefined, {})).to.equal(List());
    });


    it('should initialize the group list', () => {
        const initGroups = [{ name: 'group', avatar: 'avatar', signature: 'signature' }];
        const nextState = groups(List(), {
            type: INIT_GROUPS,
            groups: initGroups
        });
        expect(nextState).to.equal(fromJS(initGroups));
    });


    it('should add a group to the group list', () => {
        const group = { name: 'group', avatar: 'avatar', signature: 'signature' };
        const nextState = groups(List(), {
            type: ADD_GROUP,
            group
        });
        expect(nextState).to.equal(fromJS([{
            name: 'group', avatar: 'avatar', signature: 'signature'
        }]));
    });


    it('should add a msg to a group', () => {
        let initGroups = [{
            name: 'group', avatar: 'avatar', signature: 'signature', msg: []
        }];
        const msg = {
            sender: 'sender',
            avatar: 'avatar',
            type: 'plain',
            text: 'text',
            time: '20:13'
        };
        let nextState = groups(fromJS(initGroups), {
            type: ADD_GROUP_MSG,
            msg
        });
        expect(nextState).to.have.deep.property([0, 'msg', 0], fromJS(msg));

        initGroups = [{
            name: 'group', avatar: 'avatar', signature: 'signature'
        }];
        nextState = groups(fromJS(initGroups), {
            type: ADD_GROUP_MSG,
            msg
        });
        expect(nextState).to.have.deep.property([0, 'msg', 0], fromJS(msg));
    });
});
