import { createClient } from "@supabase/supabase-js";
import 'dotenv/config';


const supabase = createClient(
    process.env.PUBLIC_PROJECT_URL,
    process.env.PUBLIC_ANON_API_KEY
);

export async function readUserByName(name, password) {
    const { data, error } = await supabase
        .from('users')
        .select()
        .eq('username', name)
        .eq('password', password);
    if (error) throw new Error(error.message);
    return data;
}

export async function readAll() {
    const { data, error } = await supabase
        .from('products')
        .select();
    if (error) throw new Error(error.message);
    console.log(data);
    return data;
}

async function create() {
    const { data, error } = await supabase
        .from('users')
        .insert({ username: "Adina", password: "12345" })
        .select();
    if (error) throw new Error(error.message);
    return data;
}



async function readById(id) {
    const { data, error } = await supabase
        .from('users')
        .select()
        .eq('id', id);
    if (error) throw new Error(error.message);
    return data;
}

async function updateById(id) {
    const { data, error } = await supabase
        .from('users')
        .update({ name: "Yossi" })
        .eq('id', id)
        .select();
    if (error) throw new Error(error.message);
    return data;
}

async function deleteById(id) {
    const { data, error } = await supabase
        .from('users')
        .delete()
        .eq('id', id)
        .select();
    if (error) throw new Error(error.message);
    return data;
}


// try {
//     //const data = await create();
//     //const data1 = await readById(1);
//     //const updatedData = await updateById(1);
//     //await (deleteById(5));
//     const table = await readAll();
//     //console.table(data1);
//     console.table(table);
//     //console.table(updatedData);
// } catch (error) {
//     console.log(error.message);
// }