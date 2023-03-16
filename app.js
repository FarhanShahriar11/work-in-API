const fetchCategories= () =>{
    const url=(` https://openapi.programming-hero.com/api/ai/tools`)
    fetch(url)
    .then(res=>res.json())
    .then(data =>showCategories(data.data.tools.slice(0,6)))
}
const showCategories =data=>{
    const displayContainer=document.getElementById('main-container')
    
    displayContainer.innerHTML='';
   
   data.forEach(all=>{
    console.log(all)

     const mealDiv=document.createElement('div');
     
     mealDiv.classList.add('col');
     mealDiv.innerHTML=`
     <div class="card h-100">
     <img src=${all.image} class="card-img-top" alt="...">
     <div class="card-body">
       <h5 class="card-title">Feature</h5>
       <ol>
       <li class="card-text ${all.features[0] === undefined ? 'd-none': ''} ">${all.features[0]}</li>
       <li class="card-text ${all.features[1] === undefined ? 'd-none': '' }">${all.features[1]}</li>
       <li class="card-text ${all.features[2] === undefined ? 'd-none':'' }">${all.features[2]}</li>
       <li class="card-text ${all.features[3] === undefined ? 'd-none': '' }">${all.features[3]}</li>
       </ol>
       
       
     </div>
     <div >
     <div class="card-footer">
     <h5 class="card-title">${all.name}</h5>
     <div class=" d-flex justify-content-between align-items-center">
     <i class="fa-solid fa-calendar-days"> ${all.published_in}</i>
     <i class="fa-solid fa-arrow-right" onclick="fetchNewDetails('${all.id}')"data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
      </div>
     </div>
    
     <div>
     
     </div>
   </div>
 
     `
  displayContainer.appendChild(mealDiv)
   })
   toggleSpinner(false);

   const sorting = (a, b) => {
    const dateA = new Date(a.published_in);
    const dateB = new Date(b.published_in);

    if(dateA > dateB) {
        return 1;
    }

    else if(dateA < dateB) {
        return -1;
    }

    else {
        0;
    }
}

document.getElementById('sort-date').addEventListener('click', function() {
    showCategories(data.sort(sorting));
    
   
});

   
}
//........................modal................................................

const fetchNewDetails=id=>{
  const url=` https://openapi.programming-hero.com/api/ai/tool/${id}`
  fetch (url)
  .then(res=>res.json())
  .then(data=>showNewDetails(data.data))
}
const showNewDetails=newDetails=>{
  console.log(newDetails);
 document.getElementById('new-container').innerHTML=`
 <div class=" d-flex" >
 <div class="row">
  <div class="col-sm-6 mb-3 mb-sm-0">
  <div class="card">
  <div class="card-body">
    <h5 class="card-title">${newDetails.description}</h5>




    <div class="row" >
    <div class="col-sm-4 mb-3 mb-sm-0">
      <div class="card">
        <div class="card-body">
        <p class="card-text">${newDetails.pricing?newDetails.pricing[0].price:"No cost"}</p>
        <p class="card-text">${newDetails.pricing?newDetails.pricing[0].plan:""}</p>
          
        </div>
      </div>
    </div>
    <div class="col-sm-4  mb-3 mb-sm-0">
      <div class="card">
        <div class="card-body">
        <p class="card-text">${newDetails.pricing?newDetails.pricing[1].price:"No cost"}</p>
        <p class="card-text">${newDetails.pricing?newDetails.pricing[1].plan:""}</p>
         
        </div>
      </div>
    </div>
    <div class="col-sm-4  mb-3 mb-sm-0">
      <div class="card">
        <div class="card-body">
        <p class="card-text">${newDetails.pricing?newDetails.pricing[2].price:"No cost"}</p>
        <p class="card-text">${newDetails.pricing?newDetails.pricing[2].plan:""}</p>
        </div>
      </div>
    </div>
  </div>




    <div class="d-flex justify-content-between p-2">
    <div>
    <h5 class="card-title">Features</h5>
    
    <u1>
        <li>${newDetails.features[1].feature_name?newDetails.features[1].feature_name:""}</li>
        <li>${newDetails.features[2].feature_name?newDetails.features[2].feature_name:""}</li>
        <li>${newDetails.features[3].feature_name?newDetails.features[3].feature_name:""}</li>
        
    </ul>
    </div>
    <div>
    <h5 class="card-title">Integrations</h5>
    
 <u1>
 <u1>
 <u1>
 <li>${newDetails.integrations?newDetails.integrations[0]:"no data found"}</li>
 <li>${newDetails.integrations?newDetails.integrations[1]:"no data found "}</li>
 <li>${newDetails.integrations?newDetails.integrations[2]:"no data found "}</li>
 <li>${newDetails.integrations?newDetails.integrations[3]:" no data found"}</li>
 <li>${newDetails.integrations?newDetails.integrations[4]:"no data found "}</li>
</ul>
    
</ul>

</ul>
    
     </div>
   </div>
  </div>
</div>
  </div>
  <div class="col-sm-6">
  <div class="card">
  <img src=${newDetails.image_link[0]} class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${newDetails.input_output_examples?newDetails.input_output_examples[0].input:"Can you give any example?"}</h5>
    <p class="card-text">${newDetails.input_output_examples?newDetails.input_output_examples[0].input:"No! Not Yet! Take a break!!!"}</p>
    <div>
        <h5 class="card-title bg-danger w-25 position-absolute top-0 end-0 px-2 text-white">${newDetails.accuracy.score?newDetails.accuracy.score*100+'%accuracy':""}</h5>
    </div>
    
  </div>
</div>
  </div>
</div>
 </div>
 `
}
// show all button------------------------------------------------------------------------

const showAllData = async() => {
  toggleSpinner(true); 
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    showCategories(data.data.tools);
}
const toggleSpinner = isLoading => {
  const loaderSection=document.getElementById('loader');
  if(isLoading){
      loaderSection.classList.remove('d-none')
  }
  else{
      loaderSection.classList.add('d-none')
  }
}

fetchCategories();