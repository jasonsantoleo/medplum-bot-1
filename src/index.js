// import {BotEvent,MedplumClient} from '@medplum/bot-layer'
/**
 * Main bot handler - this is where everything starts
 * @param {MedplumClient} medplum - The Medplum client for API calls
 * @param {BotEvent} event - The incoming event with input data
 */


export const handler=async(medplum,event)=>{
    const input=event.input?.text
    if (!input && typeof input !== 'string'){
        console.log('wrong input try again');
        return 
    }
    const generateSummary=await GenerateSummary()
    return ({
        resourceType:'parameters',
        parameters:[{ 
            name:"summary",
            valueString:generateSummary
        },{
            name:"summaryLength",
            valueInteger:generateSummary.length
        },{
            name:"originalLength",
            valueInteger:input.length
        },{
            name:"compressionRatio",
            valueDecimal:0.5
        }]
    })
}
const GenerateSummary=async(text)=>{
    if (process.env.AI_MODE==='mock' && !process.env.OPEN_AI_KEY){
        return await mockSummary()
    }
    return mockSummary()
}
const  mockSummary=async(text)=>{
    const summary=text
            .replace(/\s+/g,' ')
            .split(/[!.?]+/)
            .map(s=>s.trim())
            .filter(s=>s.length>0)

    const medicalKeywords = [
        'patient', 'diagnosis', 'treatment', 'symptoms', 'medication', 
        'condition', 'pain', 'chronic', 'acute', 'therapy', 'follow-up',
        'doctor', 'nurse', 'hospital', 'clinic', 'surgery', 'procedure'
      ];
    const extractMedicalKeyword=summary.filter(s=>
        medicalKeywords.some(keyword=>s.toLowerCase()===keyword.toLowerCase())
    )
    if (extractMedicalKeyword.length>0){
        const mockSummary=extractMedicalKeyword.slice(0,2).join(' ')
        return mockSummary
    }
    if (summary.length===1){
        const mockSummary=`${summary[0]}. `    
    }
    const mockSummary=`${summary[0]}. ${summary[summary.length-1]}`
    return mockSummary
}
export const testot=()=>{
    const mockEvent = {
        input: {
          text: "The patient presented with acute chest pain and shortness of breath. Blood pressure was elevated at 180/100. The doctor prescribed medication for hypertension. Follow-up appointment scheduled in two weeks. Patient education provided on diet and exercise modifications."
        }
      };
    const medplumCli={
        search:()=>Promise.resolve({}),
        readResource:()=>Promise.resolve({}),
        writeResource:()=>Promise.resolve({})
    }
}