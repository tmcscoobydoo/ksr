// src/routes/message/+server.js
import { json } from '@sveltejs/kit';

export async function GET({url , locals:{supabase}}) {
  const search = url.searchParams.get('search');
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
  }
  
}
