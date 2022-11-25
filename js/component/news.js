const template = document.createElement('template')


template.innerHTML = `
    <link rel='stylesheet' href='./css/style.css'>
    <div class="news">
        <div class="heading">
            ঈশ্বরদীতে ২৫ হাজার টাকা ঋণের মামলায় ১২ কৃষক জেলে
        </div>
        <div class="sub_heading">
            <div class="representative">
                পাবনা জেলা
            </div>
            <div class="date_time">
                25 November, 2022 | 7:42 PM
            </div>
        </div>
        <div class="details">
            পাবনার ঈশ্বরদী উপজেলায় ২৫ থেকে ৩০ হাজার টাকা ঋণ নিয়ে ফেরত না দেওয়ার অভিযোগে করা একটি মামলায় ৩৭ জন কৃষকের নামে গ্রেপ্তারি পরোয়ানা জারি করেন পাবনার সিনিয়র জুডিশিয়াল আদালত।

        গতকাল বৃহস্পতিবার রাত থেকে আজ শুক্রবার সকাল পর্যন্ত তাঁদের মধ্যে ১২ জনকে গ্রেপ্তার করেছে পুলিশ। দুপুরে তাঁদের আদালতের মাধ্যমে কারাগারে পাঠানো হয়েছে।
        </div>
    </div>
`

class News extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ['title', 'representative', 'date_time', 'details']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.shadowRoot.querySelector('.news .heading').textContent = this.getAttribute('title')
        this.shadowRoot.querySelector('.sub_heading .representative').textContent = this.getAttribute('representative')
        this.shadowRoot.querySelector('.sub_heading .date_time').textContent = this.getAttribute('date_time')
        this.shadowRoot.querySelector('.news .details').textContent = this.getAttribute('details')
        
    }
}

export default News;