console.log('medplum inport checker');
try {
    const core =await import('@medplum/core')
    console.log(Object.keys(core));
    console.log(`bot is avaliable : ${'BotEvent' in core}`);
    
} catch (error) {
    console.error('erro in importing medplum ');
}
