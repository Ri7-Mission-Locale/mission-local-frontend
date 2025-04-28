


export default function FileInput( {htmlFor,label,id}){

return (
    <>  
<div class="mb-5">
    <label class=" block mb-2 text-sm font-medium text-gray-900 " htmlFor={htmlFor}>{label}</label>
<input class="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none " id={id} type="file"/>
</div>
</>
)

}