import News from "./component/news.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, ref, set, get, child, update, remove} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

window.customElements.define('new-s', News)




  // https://firebase.google.com/docs/web/setup#available-libraries
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAlqYwFwgRaY94Q6ljEUIEjSYg9JzSZQmc",
    authDomain: "testnews-e468c.firebaseapp.com",
    projectId: "testnews-e468c",
    storageBucket: "testnews-e468c.appspot.com",
    messagingSenderId: "588573167264",
    appId: "1:588573167264:web:b1495921a61777012e83c5"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getDatabase(app);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  var newNews = document.getElementById('newNews');

  
  
    

  function createNews(count) {
    
    var heading = newNews.querySelector('.heading').value;
    var author = newNews.querySelector('.author').value;
    var details = newNews.querySelector('.details').value;

    const dt = new Date();
    var date_time = dt.getDate() +' '+ months[dt.getMonth()]+', '+dt.getFullYear()+' | '+ dt.getHours()%12 +':'+dt.getMinutes() + ' ' +  `${dt.getHours() >= 12 ? 'PM':'AM'}`;

    set(ref(db, 'newses/' + ++count), {
        heading: heading,
        author: author,
        time : date_time,
        details : details
      })
      .then(()=>{
        alert('Data Stored!')
      })
      .catch((error)=>{
        alert('Error Occured: '+ error)
      })
  }

  var submit
  newNews ? submit = newNews.querySelector('.submit') : ''
  submit ? submit.addEventListener('click', ()=> {

    get(child(ref(db), 'newses'))
    .then((snapshot)=>{
      var count=0;
      snapshot.forEach(() => {
        count++
      });
      createNews(count);
      alert(count)
    })
    .catch((error)=>{
      alert(error)
    })

    
  }):'';



var latest_news = document.getElementById('latest_news');

  get(child(ref(db), 'newses'))
    .then((snapshot)=>{
      snapshot.forEach((snap) => {
        showNews(snap.val())
      });
    })
    .catch((error)=>{
      alert(error)
    })

    function showNews(e){
      var news = document.createElement('new-s')
      news.setAttribute('title', e.heading);
      news.setAttribute('representative', e.author);
      news.setAttribute('date_time', e.time);
      news.setAttribute('details', e.details);

      latest_news.appendChild(news);
    }
