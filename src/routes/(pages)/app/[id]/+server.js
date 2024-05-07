// src/routes/message/+server.js
import { json } from '@sveltejs/kit';

export async function GET({url , locals:{supabase}}) {
  const search = url.searchParams.get('search');
  const invite = url.searchParams.get('invite');
  let result;
  
  if (search){
    try {
      let { data, error } = await supabase.rpc('search_users', { searchquery: search })
      data = data.map(obj => {
        let newObj = {...obj};
        delete newObj.uuid;
        return newObj;
      });
      result = data
      return json(result);
    } catch (error) {
        console.log(error)
    }
  }else if(invite){
    let parts = invite.split('|');
    let freind = parts[0];
    console.log(freind)
    let me = parts[1];
    let freinds
    try {
      const { data, error } = await supabase
      .from('users')
      .select('freinds')
      .eq('uuid', me)
      
      freinds = data[0].freinds
     
    } catch (error) {
      console.log(error)
    }
    freinds = [...freinds, freind];
   
    try {
      
      const { data, error } = await supabase
      .from('users')
      .update({ freinds: freinds })
      .eq('uuid', me)
      .select()
    } catch (error) {
      console.log(error)
    }

   
    return json({success:true, id : freind})
  }
  
    
  
  
}
