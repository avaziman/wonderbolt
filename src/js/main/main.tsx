// import { onClick } from './index';
import { useState } from 'react';
import { addSubtitles, findSubtitle } from '../../jsx/ppro/ppro';
import '../../output.css'
import { evalTS } from '../lib/utils/bolt';
import { path } from '../lib/cep/node';


function onTranscribeClick(punctuated: boolean) {
  evalTS("addSubtitles", punctuated).then((res) => {
    console.log(res);
  });
}



const Main = () => {
  // const app = window['com.wonderbolt.cep'] as any;
  // alert(JSON.stringify(window))
  const [punctioationState, setRadioState] = useState(true);
  // const 

  function punctuationToggle() {
    setRadioState(!punctioationState);
  }

  return (
    <div className='flex flex-col items-center'>
      <h1 className="my-5 text-center text-blue-700 font-bold">WONDERBOLT</h1>

      <div className="flex items-center" onClick={punctuationToggle}>
        <input checked={punctioationState} onChange={e => { }} id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Punctucation</label>
      </div>
      <button className="w-48 my-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={() => onTranscribeClick(punctioationState)}>ADD CAPS</button>
    </div>
  );
};
export default Main;