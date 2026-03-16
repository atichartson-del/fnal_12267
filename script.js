
const movies = [
  {
    title:    'ล้วงลับเวทีลวง',
    genre:    'ระทึกขวัญ / ลึกลับ',
    director: 'สมชาย วิเศษมายา',
    cast:     'นพ วรรณกร, มินตรา สุนทรี, กฤต ภัทรกุล',
    synopsis: 'เรื่องราวของ "ดาริน" นักมายากลสาวผู้เต็มไปด้วยความลับ ที่ถูกจ้างให้แสดงในคืนที่ทุกอย่างเริ่มไม่เป็นดั่งใจ เมื่อผู้ชมในโรงละครโบราณเริ่มหายตัวไปทีละคน และเธอต้องค้นหาความจริงก่อนที่ม่านจะตกลงเป็นครั้งสุดท้าย',
    img:      'https://picsum.photos/seed/magic/500/700'
  },
  {
    title:    'เซลล์ขยันพันธุ์เดือด',
    genre:    'แอ็กชัน / ไซไฟ',
    director: 'อานนท์ พัฒนาชีวะ',
    cast:     'วิกรม ชัยนาม, ปาณิสรา รัตนวงศ์, ธนา สุขเกษม',
    synopsis: 'เมื่อโรคร้ายกลายพันธุ์โจมตีร่างกายของ "ไทยัน" นักวิทยาศาสตร์รุ่นใหม่ เซลล์ในร่างกายของเขาต้องลุกขึ้นสู้กับศัตรูที่มองไม่เห็น ในภาพยนตร์แอ็กชันระดับ Micro ที่จะพาคุณดำดิ่งสู่โลกจิ๋วอย่างที่ไม่เคยเห็นมาก่อน',
    img:      'https://picsum.photos/seed/cell/500/700'
  },
  {
    title:    'Gundam Seed Freedom Special Edition',
    genre:    'Sci-Fi / Mecha',
    director: 'Mitsuo Fukuda',
    cast:     'Kira Yamato, Lacus Clyne, Athrun Zala',
    synopsis: 'หลังสงคราม Coordinator และ Natural สิ้นสุดลง โลกกลับไม่สงบสุขดังหวัง เมื่อองค์กลุ่มปริศนา "Foundation" เริ่มใช้พลัง COMPASS เพื่อครอบงำโลก Kira Yamato ต้องลุกขึ้นสู้อีกครั้ง ในภาคพิเศษที่ยิ่งใหญ่กว่าเดิม',
    img:      'https://picsum.photos/seed/gundam/500/700'
  }
];


window.addEventListener('scroll', () => {
  const navbar = document.getElementById('mainNavbar');
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

const movieModal = document.getElementById('movieModal');

movieModal.addEventListener('show.bs.modal', (event) => {

  const trigger = event.relatedTarget;
  const index   = parseInt(trigger.getAttribute('data-movie'));
  const m       = movies[index];

  if (!m) return;

  document.getElementById('modalMovieTitle').textContent = m.title;
  document.getElementById('modalGenre').textContent      = m.genre;
  document.getElementById('modalDirector').textContent   = m.director;
  document.getElementById('modalCast').textContent       = m.cast;
  document.getElementById('modalSynopsis').textContent   = m.synopsis;

  const img   = document.getElementById('modalMovieImg');
  img.src     = m.img;
  img.alt     = m.title;
});

document.querySelectorAll('.dropdown-item[data-movie]').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const index = item.getAttribute('data-movie');

    const fakeTrigger = document.createElement('button');
    fakeTrigger.setAttribute('data-movie', index);
    fakeTrigger.setAttribute('data-bs-toggle', 'modal');
    fakeTrigger.setAttribute('data-bs-target', '#movieModal');
    document.body.appendChild(fakeTrigger);

  
    const dropdownEl = item.closest('.dropdown');
    const dropdownToggle = dropdownEl.querySelector('[data-bs-toggle="dropdown"]');
    const bsDropdown = bootstrap.Dropdown.getInstance(dropdownToggle);
    if (bsDropdown) bsDropdown.hide();

    setTimeout(() => {
      const bsModal = new bootstrap.Modal(document.getElementById('movieModal'));
     
      const m = movies[parseInt(index)];
      document.getElementById('modalMovieTitle').textContent = m.title;
      document.getElementById('modalGenre').textContent      = m.genre;
      document.getElementById('modalDirector').textContent   = m.director;
      document.getElementById('modalCast').textContent       = m.cast;
      document.getElementById('modalSynopsis').textContent   = m.synopsis;
      const img = document.getElementById('modalMovieImg');
      img.src   = m.img;
      img.alt   = m.title;
      bsModal.show();
      document.body.removeChild(fakeTrigger);
    }, 200);
  });
});


function submitContact() {
  const name    = document.getElementById('inputName').value.trim();
  const email   = document.getElementById('inputEmail').value.trim();
  const message = document.getElementById('inputMessage').value.trim();

  if (!name || !email || !message) {
    alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
    return;
  }


  const toastEl = document.getElementById('contactToast');
  const toast   = new bootstrap.Toast(toastEl, { delay: 3500 });
  toast.show();


  document.getElementById('inputName').value    = '';
  document.getElementById('inputEmail').value   = '';
  document.getElementById('inputMessage').value = '';
}


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
