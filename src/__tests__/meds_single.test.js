import React from 'react';
import { shallow, mount } from 'enzyme';
import {Provider} from 'react-redux';
import store from '../store';
import { MedsSingle as VanillaMedsSingle } from '../components/meds_single';
import MedsSingle  from '../components/meds_single';

describe('the Meds Single Component', ()=>{
    //props are form, formKey, oneMed, whichMed
    const form = 'medsForm';
    const formKey = 1;
    const oneMed = {name: "Tussin", dosage: "a Lot", rateAmount: 99, howLongAmount: 365};
    const whichMed = 0;
    
    const callback = jest.fn();
    it('Should render without crashing', ()=>{
        shallow(<VanillaMedsSingle handleSubmit={callback}
            form={form}
            formKey={formKey}
            oneMed={oneMed}
            whichMed={whichMed}
        />);
    });

    it('the reduxForm wrapper without crashing..?', ()=>{
        shallow(<Provider store={store}><MedsSingle 
            handleSubmit={callback}
            form={form}
            formKey={formKey}
            oneMed={oneMed}
            whichMed={whichMed}
        />
        </Provider>
    );
    });

    it('Should have a form rendered', ()=>{
        const wrapper = mount(<Provider store={store}><MedsSingle 
                handleSubmit={callback}
                form={form}
                formKey={formKey}
                oneMed={oneMed}
                whichMed={whichMed}
            />
            </Provider>
        );
        const findVar = wrapper.find('.innerlist');
        expect(findVar.hasClass('innerlist')).toEqual(true);
    });

    it('Should call the jest fn when form is submitted', ()=>{
        const wrapper = mount(<Provider store={store}><MedsSingle 
                handleSubmit={callback}
                form={form}
                formKey={formKey}
                oneMed={oneMed}
                whichMed={whichMed}
            />
            </Provider>
        );
        const findVar = wrapper.find('.innerlist');
        expect(findVar.hasClass('innerlist')).toEqual(true);
        const findForm = wrapper.find('#medsForm');
        findForm.simulate('submit');
        expect(callback).toHaveBeenCalled();
    });

    // it('Should call jest with value when form has value with Submit', ()=>{
    //     const wrapper = mount(<Provider store={store}><MedsSingle 
    //         handleSubmit={callback}
    //         form={form}
    //         formKey={formKey}
    //         oneMed={oneMed}
    //         whichMed={whichMed}
    //     />
    //     </Provider>
    // );
    // const findForm = wrapper.find('#medsForm');
    // const theInput = wrapper.find('input[name="name"]');
    // theInput.instance().value = 'James';
    // findForm.simulate('submit');
    // expect(callback).toHaveBeenCalledWith({"name": "James"});
    // });
});
