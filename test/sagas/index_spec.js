import {expect} from 'chai';
import watchActions from '../../app/sagas/index';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

//helper methods
//type of action dispatched
const actionType = (next)=>{
    return next.value.PUT.action.type;
};

//name of the selector 
const selectorName= (next)=>{
    return next.value.SELECT.selector.name;
};

//will give the name of the function  the call effect yield
const callFnName = (next) => {
    return next.value.CALL.fn.name;
};

describe('sagas', () =>{
    describe('watchActions()', () => {
        const generator = watchActions();
        const next = generator.next();
        
        it('watches stand, fetch record, and setup game', () => {
            expect(next.value[0].name).to
                .eq('takeLatest(STAND, onStand)');
                
            expect(next.value[1].name).to
                .eq('takeLatest(FETCH_RECORD, onFetchRecord)');
                
            expect(next.value[2].name).to
                .eq('takeLatest(SETUP_GAME, onPatchRecord)');
        });
    });
    
    /*
    proxyquire() function takes two arguments: the file that we are importing from
    and an object with keys that tell it which modules we want to replace 
    In this case, we are going to run our tests on a special version of the reducer 
    that uses a stubbed score function -- one that thinks the score of any hand is 21. 
    
    Sinon stubs to give us more control over the methods and to allow us to spy 
    on methods to verify that they were actually called.
    */

    describe('onStand', ()=> {
        const cardUtils={};
        
        const stubbedSagas= proxyquire(
            '../../app/sagas/index',
            {'../lib/cards': cardUtils }
        );
        
        let generator;
        
        /*
        Mocha will call the function passed to beforeEach(). In this case,
        we will use beforeEach() to reset the stubs so that each test will
        be independent of the others
        */
        
        beforeEach( ()=>{
            cardUtils.score= sinon.stub();
            generator = stubbedSagas.onStand();
        });
        
        context('when dealer does not draw', () =>{
            it('yields correct effects', ()=>{
                
                cardUtils.score.returns(21);
                
                expect(selectorName(generator.next())).to.eq('getSpeed');
                expect(actionType(generator.next())).to.eq('DEAL_TO_DEALER');
                expect(selectorName(generator.next())).to.eq('getDealerHand');
                expect(actionType(generator.next())).to.eq('DETERMINE_WINNER');
                expect(generator.next().done).to.eq(true);
            });
            
        });
      
        context('when dealer draws' , () => {
            it('yields correct effects', () => {
                
                cardUtils.score.onCall(0).returns(10);
                cardUtils.score.onCall(1).returns(21);

                expect(selectorName(generator.next())).to.eq('getSpeed');
                expect(actionType(generator.next())).to.eq('DEAL_TO_DEALER');
                expect(selectorName(generator.next())).to.eq('getDealerHand');
                expect(callFnName(generator.next())).to.eq('delay');
                expect(actionType(generator.next())).to.eq('DEAL_TO_DEALER');
                expect(selectorName(generator.next())).to.eq('getDealerHand');
                expect(actionType(generator.next())).to.eq('DETERMINE_WINNER');
                expect(generator.next().done).to.eq(true);
            });
        });
    });
});