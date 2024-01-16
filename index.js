const menuItems = document.querySelectorAll(".menu-item");

//mesages

const messagesNotification = document.querySelector('#messages-notification');
const messages = document.querySelector('.messages');
const message = messages.querySelectorAll('.message');
const messageSearch = document.querySelector('#message-search');

//tema

const theme = document.querySelector('#theme');
const themeModal = document.querySelector('.customize-theme');
const fontSizes = document.querySelectorAll('.choose-size span');
var root = document.querySelector(':root');
const colorPalette = document.querySelectorAll('.choose-color span');
const Bg1 = document.querySelector(".bg-1");
const Bg2 = document.querySelector(".bg-2");
const Bg3 = document.querySelector(".bg-3");

const changeActiveItem = () => {
    menuItems.forEach(item => {
        item.classList.remove('active');
    })
}

menuItems.forEach(item => {
    item.addEventListener("click", () => {
        changeActiveItem();
        item.classList.add("active");
        if(item.id != "notifications"){
            document.querySelector(".notifications-popup")
            .style.display = "none";
        } else{
            document.querySelector(".notifications-popup")
            .style.display = "block";
            document.querySelector("#notifications .notification-count")
            .style.display = "none";
        }
    })
})

const searchMessage = () => {
    const val = messageSearch.value.toLowerCase();
    message.forEach(chat => {
        let name = chat.querySelectorAll('h5').textContent.toLowerCase();
        if(name.indexOf(val) != -1){
            chat.style.display = 'flex';
        } 
        else{
            chat.style.display = 'none';
        }
    })
}

//buscarg mensaje
messageSearch.addEventListener('keyup', searchMessage);


//--mensajes

messagesNotification.addEventListener('click', () => {
    messages.style.boxShadow = '0 0 1rem var(--color-primary)';
    messagesNotification.querySelector('.notification-count').style.display = 'none'
    setTimeout(() => {
        messages.style.boxShadow = 'none'
    }, 2000);
})

// cambiar tema
const openThemeModal = () => {
    themeModal.style.display = 'grid';
}

const closeThemeModal =(e) => {
    if(e.target.classList.contains('customize-theme')){
        themeModal.style.display = 'none';
    }
}

themeModal.addEventListener('click',closeThemeModal);


theme.addEventListener('click', openThemeModal);


const removeSizeSelector = () => {
    fontSizes.forEach(size => {
        size.classList.remove('active')
    })
}

fontSizes.forEach(size => {

    size.addEventListener('click', () => {
        removeSizeSelector();
        let fontSizes;
        size.classList.toggle('active');
        
    if(size.classList.contains('font-size-1')){
        fontSizes = '10px';
        root.style.setProperty('--sticky-top-left', '5.4rem');
        root.style.setProperty('--sticky-top-right', '5.4rem');
    } 
    else if(size.classList.contains('font-size-2')){
        fontSizes = '13px';
        root.style.setProperty('--sticky-top-left', '5.4rem');
        root.style.setProperty('--sticky-top-right', '-7rem');
    }
    else if(size.classList.contains('font-size-3')){
        fontSizes = '16px';
        root.style.setProperty('--sticky-top-left', '-2rem');
        root.style.setProperty('--sticky-top-right', '-17rem');
    }
    else if(size.classList.contains('font-size-4')){
        fontSizes = '19px';
        root.style.setProperty('--sticky-top-left', '-5rem');
        root.style.setProperty('--sticky-top-right', '-25rem');
    }
    else if(size.classList.contains('font-size-5')){
        fontSizes = '22px';
        root.style.setProperty('--sticky-top-left', '-12rem');
        root.style.setProperty('--sticky-top-right', '-35rem');
    }

    document.querySelector('html').style.fontSize = fontSizes;
    })
    

})

const changeActiveColorClass = () => {
    colorPalette.forEach(colorPicker => {
        colorPicker.classList.remove('active')
    })
}

// cambiar colores principales
colorPalette.forEach(color => {
    color.addEventListener('click' , () => {
        let primary;
        changeActiveColorClass();

        if(color.classList.contains('color-1')){
            primaryHue = 252;
        }
        else if(color.classList.contains('color-2')){
            primaryHue = 152;
        }
        else if(color.classList.contains('color-3')){
            primaryHue = 100;
        }
        else if(color.classList.contains('color-4')){
            primaryHue = 202;
        }
        else if(color.classList.contains('color-5')){
            primaryHue = 50;
        }
        color.classList.add('active');
        
        root.style.setProperty('--primary-color-hue', primaryHue);
    })
})

let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

const changeBG = () => {
    root.style.setProperty("--light-color-lightness", lightColorLightness);
    root.style.setProperty("--white-color-lightness", whiteColorLightness);
    root.style.setProperty("--dark-color-lightness", darkColorLightness);
}

Bg1.addEventListener("click", () => {
    Bg1.classList.add("active");
    Bg2.classList.remove("active");
    Bg3.classList.remove("active");
    window.location.reload();
});

Bg2.addEventListener("click", () => {
    darkColorLightness = "95%";
    whiteColorLightness = "20%";
    lightColorLightness = "15%";

    Bg2.classList.add("active");
    Bg1.classList.remove("active");
    Bg3.classList.remove("active");
    changeBG();
})

Bg3.addEventListener("click", () => {
    darkColorLightness = "95%";
    whiteColorLightness = "10%";
    lightColorLightness = "0%";

    Bg3.classList.add("active");
    Bg1.classList.remove("active");
    Bg2.classList.remove("active");
    changeBG();
})

const form = document.querySelector('.create-post');
const feeds = document.querySelector('.feeds');

form.addEventListener('submit', e => {
  e.preventDefault();

  const content = form.querySelector('#create-post').value;
  const profileImg = form.querySelector('.profile-photo img').src;

  const feed = createFeed(content, profileImg);
  
  feeds.appendChild(feed);
  
  form.reset();
});

function createFeed(content, profileImg) {
  // Crear los elementos del feed
  const div = document.createElement('div');
  div.className = 'feed';

  // Añadir contenido
  div.innerHTML = `
    <div class="head">
      <div class="user">
        <div class="profile-photo">
          <img src="${profileImg}">  
        </div>
        <div class="ingo">
          <h3>Diego Flores</h3>
          <small>Ahora</small>
        </div>
      </div>
    </div>
    
    <div class="post-texto">
      ${content}
    </div>
    <div class="interaction-buttons">
    <span><i class="uil uil-heart"></i> </span>
    <span><i class="uil uil-comment-dots"></i> </span>
    <span><i class="uil uil-share-alt"></i> </span>
    </div>

  `;

  return div;
}






