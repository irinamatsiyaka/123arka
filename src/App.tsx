import { FormEvent, useEffect, useRef, useState } from "react";

const A = "/assets/";
const nav = [["Об АРКА 123","about"],["Помещение","space"],["Услуги","services"],["Галерея","gallery"],["Тарифы","tariffs"],["Отзывы","reviews"]];
const archivePhotoPaths = [
  "/photo/01.png",
  "/photo/1.png",
  "/photo/10.png",
  "/photo/11.png",
  "/photo/12.png",
  "/photo/13 (1).png",
  "/photo/14.png",
  "/photo/15.png",
  "/photo/16.png",
  "/photo/17.png",
  "/photo/18.png",
  "/photo/19.png",
  "/photo/2 (1).png",
  "/photo/2 (2).png",
  "/photo/20.png",
  "/photo/21.png",
  "/photo/22.jpeg",
  "/photo/3.png",
  "/photo/4.png",
  "/photo/5.png",
  "/photo/6.png",
  "/photo/7.png",
  "/photo/8.png",
  "/photo/9.png",
  "/photo_without_effects/photo_10_2026-09-21_17-01-49.jpg",
  "/photo_without_effects/photo_11_2026-09-21_17-01-49.jpg",
  "/photo_without_effects/photo_12_2026-09-21_17-01-49.jpg",
  "/photo_without_effects/photo_13_2026-09-21_17-01-49.jpg",
  "/photo_without_effects/photo_14_2026-09-21_17-01-49.jpg",
  "/photo_without_effects/photo_15_2026-09-21_17-01-49.jpg",
  "/photo_without_effects/photo_16_2026-09-21_17-01-49.jpg",
  "/photo_without_effects/photo_17_2026-09-21_17-01-49.jpg",
  "/photo_without_effects/photo_18_2026-09-21_17-01-49.jpg",
  "/photo_without_effects/photo_19_2026-09-21_17-01-49.jpg",
  "/photo_without_effects/photo_1_2026-09-21_17-01-49.jpg",
  "/photo_without_effects/photo_1_2026-09-21_17-02-11.jpg",
  "/photo_without_effects/photo_1_2026-09-21_17-03-29.jpg",
  "/photo_without_effects/photo_1_2026-09-21_17-27-14.jpg",
  "/photo_without_effects/photo_1_2026-09-21_18-00-11.jpg",
  "/photo_without_effects/photo_2_2026-09-21_17-01-49.jpg",
  "/photo_without_effects/photo_2_2026-09-21_17-02-11.jpg",
  "/photo_without_effects/photo_2_2026-09-21_17-03-29.jpg",
  "/photo_without_effects/photo_2_2026-09-21_17-27-14.jpg",
  "/photo_without_effects/photo_2_2026-09-21_18-00-11.jpg",
  "/photo_without_effects/photo_3_2026-09-21_17-01-49.jpg",
  "/photo_without_effects/photo_3_2026-09-21_17-03-29.jpg",
  "/photo_without_effects/photo_3_2026-09-21_17-27-14.jpg",
  "/photo_without_effects/photo_3_2026-09-21_18-00-11.jpg",
  "/photo_without_effects/photo_4_2026-09-21_17-01-49.jpg",
  "/photo_without_effects/photo_4_2026-09-21_17-03-29.jpg",
  "/photo_without_effects/photo_4_2026-09-21_17-27-14.jpg",
  "/photo_without_effects/photo_4_2026-09-21_18-00-11.jpg",
  "/photo_without_effects/photo_5_2026-09-21_17-01-49.jpg",
  "/photo_without_effects/photo_5_2026-09-21_17-03-29.jpg",
  "/photo_without_effects/photo_5_2026-09-21_17-27-14.jpg",
  "/photo_without_effects/photo_6_2026-09-21_17-01-49.jpg",
  "/photo_without_effects/photo_6_2026-09-21_17-03-29.jpg",
  "/photo_without_effects/photo_6_2026-09-21_17-27-14.jpg",
  "/photo_without_effects/photo_7_2026-09-21_17-01-49.jpg",
  "/photo_without_effects/photo_7_2026-09-21_17-03-29.jpg",
  "/photo_without_effects/photo_7_2026-09-21_17-27-14.jpg",
  "/photo_without_effects/photo_8_2026-09-21_17-01-49.jpg",
  "/photo_without_effects/photo_8_2026-09-21_17-03-29.jpg",
  "/photo_without_effects/photo_9_2026-09-21_17-01-49.jpg",
];
const archivePhotos = archivePhotoPaths
  .filter(path =>
    !/\/(?:6\.png|12\.png|22\.jpeg)$/.test(path) &&
    !path.endsWith("/photo_1_2026-09-21_17-01-49.jpg") &&
    !path.endsWith("/photo_2_2026-09-21_17-01-49.jpg"),
  )
  .sort((a, b) => a.localeCompare(b))
  .map((src, index) => ({
    src,
    alt: `Фотография АРКА 123 из архива ${index + 1}`,
  }));
const gallery = [
  {src:"space.png",alt:"Пустой зал АРКА 123 с арочными окнами"},
  {src:"exterior.png",alt:"Вид на здание снаружи"},
  {src:"entrance.png",alt:"Вход в пространство АРКА 123"},
  {src:"brand.png",alt:"Детали оформления АРКА 123"},
  {src:"brooch.jpg",alt:"Деталь оформления пространства"},
  ...["room-workspace-12.jpg","room-workspace-13.jpg","room-workspace-14.jpg","room-workspace-15.jpg","room-workspace-16.jpg","room-workspace-17.jpg","room-workspace-18.jpg","room-workspace-19.jpg"].map((src,index)=>({
    src,
    alt:`Пример оформления зала АРКА 123 ${index+1}`,
  })),
  ...["6.png","12.png","22.jpeg","Gemini_Generated_Image_7x9rc17x9rc17x9r.jpeg","Gemini_Generated_Image_r22jknr22jknr22j.jpeg","Gemini_Generated_Image_c06zfoc06zfoc06z.jpeg","Gemini_Generated_Image_58x7lg58x7lg58x7.jpeg"].map((src,index)=>({
    src,
    alt:`Фото пространства и мероприятий АРКА 123 ${index+1}`,
  })),
  ...archivePhotos,
];
const roomLayouts = [
  {
    title:"Пустое помещение",
    description:"Светлый зал с арочными окнами — свободное пространство для вашего события.",
    images:[
      {src:"6.png",label:"Пустое помещение, вид на зал"},
      {src:"12.png",label:"Пустое помещение с арочными окнами"},
      {src:"22.jpeg",label:"Пустой зал АРКА 123"},
    ],
  },
  {
    title:"Мастер-класс",
    description:"Пространство для занятий, встреч и творческих мастер-классов.",
    images:[
      {src:"Gemini_Generated_Image_7x9rc17x9rc17x9r.jpeg",label:"Мастер-класс в зале АРКА 123"},
      {src:"Gemini_Generated_Image_r22jknr22jknr22j.jpeg",label:"Участники мастер-класса за работой"},
    ],
  },
  {
    title:"Разговор за общим столом",
    description:"Один большой стол на 12 человек или четыре отдельных стола по 4–5 человек.",
    images:[
      {src:"Gemini_Generated_Image_c06zfoc06zfoc06z.jpeg",label:"Рассадка за столами для мастер-класса"},
      {src:"Gemini_Generated_Image_58x7lg58x7lg58x7.jpeg",label:"Общий стол для встречи в АРКА 123"},
    ],
  },
];
const services = [
  ["Аренда зала","123 м², свет и Wi-Fi; будни / выходные","85 / 110 BYN / час"],
  ["Проектор и экран","Проектор, экран, подключение ноутбука","55 BYN / мероприятие"],
  ["Мебель","Стулья, столы, стойка ведущего","Включена в аренду"],
  ["Звук","Колонка и микрофон для ведущего","50 BYN / мероприятие"],
  ["Кофе-брейк зона","Стол, посуда, кулер","Включена в аренду"],
  ["Администратор","Встретит гостей и поможет с настройкой","Включён в аренду"],
];

function RoomModelPreview() {
  const viewerContainerRef = useRef<HTMLDivElement>(null);
  const [modelError, setModelError] = useState(false);

  useEffect(() => {
    const container = viewerContainerRef.current;
    if (!container) return;

    let cancelled = false;
    let viewer: HTMLElement | undefined;
    const handleError = () => {
      console.error("Не удалось загрузить 3D-модель помещения АРКА 123.");
      setModelError(true);
    };
    import("@google/model-viewer")
      .then(() => {
        if (cancelled) return;
        viewer = document.createElement("model-viewer");
        viewer.setAttribute("src", `${A}untitled-beige-surfaces.glb`);
        viewer.setAttribute("alt", "Черновая 3D-визуализация помещения АРКА 123");
        viewer.setAttribute("environment-image", `${A}warm-neutral-environment.hdr`);
        viewer.setAttribute("camera-controls", "");
        viewer.setAttribute("disable-zoom", "");
        viewer.setAttribute("camera-orbit", "0deg 88deg 5.5m");
        viewer.setAttribute("camera-target", "-0.6m -0.5m 0m");
        viewer.setAttribute("min-camera-orbit", "auto 10deg 3m");
        viewer.setAttribute("max-camera-orbit", "auto 95deg 20m");
        viewer.setAttribute("interaction-prompt", "auto");
        viewer.setAttribute("loading", "eager");
        viewer.setAttribute("shadow-intensity", "0");
        viewer.setAttribute("touch-action", "pan-y");
        viewer.addEventListener("error", handleError);
        container.append(viewer);
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        console.error("Не удалось загрузить компонент 3D-визуализации.", error);
        setModelError(true);
      });

    return () => {
      cancelled = true;
      viewer?.removeEventListener("error", handleError);
      container.replaceChildren();
    };
  }, []);

  return (
    <div className="room-model-preview">
      <div className="room-model-copy">
        <span className="eyebrow">/ 3D-визуализация</span>
        <h3>Покрутите модель помещения</h3>
        <p>
          Это черновой вариант визуализации помещения, поэтому он может
          выглядеть не очень симпатично. Перетаскивайте модель мышью или
          пальцем, чтобы осмотреть зал со всех сторон.
        </p>
      </div>
      <div className="room-model-viewer" ref={viewerContainerRef}>
        {modelError && (
          <p role="alert">Не удалось загрузить 3D-модель. Попробуйте обновить страницу.</p>
        )}
      </div>
    </div>
  );
}

function Logo({compact=false}:{compact?:boolean}){
  const [markup,setMarkup]=useState<string|null>(null);
  useEffect(()=>{let active=true;fetch(`${A}arka123-logo.svg`).then(response=>{if(!response.ok)throw new Error(`HTTP ${response.status}`);return response.text()}).then(svg=>{if(active)setMarkup(svg)}).catch(error=>console.error("Не удалось загрузить SVG-логотип АРКА 123.",error));return()=>{active=false}},[]);
  return <a className={`logo${compact?" compact":""}`} href="#top" aria-label="АРКА 123 — Встречаемся напротив Библиотеки">{markup?<span className="logo-art" dangerouslySetInnerHTML={{__html:markup}}/>:<img className="logo-art" src={`${A}arka123-logo.svg`} alt=""/>}</a>
}
function Heading({label,title,copy}:{label:string,title:string,copy?:string}){
  return <div className="section-head reveal"><span className="eyebrow">/ {label}</span><h2>{title}</h2>{copy&&<p>{copy}</p>}</div>
}

export default function App(){
  const heroRef=useRef<HTMLElement>(null), heroImageRef=useRef<HTMLImageElement>(null), heroVideoRef=useRef<HTMLVideoElement>(null), canvasRef=useRef<HTMLCanvasElement>(null);
  const [ready,setReady]=useState(false),[minimumElapsed,setMinimumElapsed]=useState(false),[heroImageReady,setHeroImageReady]=useState(false),[hasVideoFrame,setHasVideoFrame]=useState(false),[menu,setMenu]=useState(false),[requestOpen,setRequestOpen]=useState(false),[galleryOpen,setGalleryOpen]=useState(false),[state,setState]=useState("start"),[tab,setTab]=useState(0),[spacePhoto,setSpacePhoto]=useState(0),[lightbox,setLightbox]=useState<number|null>(null),[sent,setSent]=useState(false),[error,setError] = useState("");
  const spaceTouchStart=useRef<number|null>(null);
  const galleryTouchStart=useRef<number|null>(null);
  const galleryImageSrc=(src:string)=>src.startsWith("/")?src:`${A}${src}`;
  const changeSpacePhoto=(direction:number)=>setSpacePhoto(current=>(current+direction+roomLayouts[tab].images.length)%roomLayouts[tab].images.length);
  useEffect(()=>{
    const timer=window.setTimeout(()=>setMinimumElapsed(true),1800),image=heroImageRef.current;
    const onLoaded=()=>setHeroImageReady(true),onError=()=>{console.error("Не удалось загрузить изображение hero АРКА 123.");setHeroImageReady(true)};
    image?.addEventListener("load",onLoaded);
    image?.addEventListener("error",onError);
    if(image?.complete){if(image.naturalWidth>0)onLoaded();else onError()}
    return()=>{window.clearTimeout(timer);image?.removeEventListener("load",onLoaded);image?.removeEventListener("error",onError)};
  },[]);
  useEffect(()=>{if(minimumElapsed&&heroImageReady)setReady(true)},[minimumElapsed,heroImageReady]);
  useEffect(()=>{
    const hero=heroRef.current,video=heroVideoRef.current,canvas=canvasRef.current;
    if(!hero||!video||!canvas)return;
    const context=canvas.getContext("2d");
    if(!context){console.error("Не удалось создать canvas для кадров видео АРКА 123.");return}
    const isCoarsePointer=window.matchMedia("(pointer: coarse)").matches;
    let raf=0,seekInFlight=false,progress=0,lastSeekAt=0,seekTimer=0;
    const drawFrame=()=>{
      if(video.readyState<2||!video.videoWidth||!video.videoHeight)return;
      const {width,height}=canvas.getBoundingClientRect(),scale=Math.min(window.devicePixelRatio||1,1.5),pixelWidth=Math.max(1,Math.round(width*scale)),pixelHeight=Math.max(1,Math.round(height*scale));
      if(canvas.width!==pixelWidth||canvas.height!==pixelHeight){canvas.width=pixelWidth;canvas.height=pixelHeight}
      const fit=Math.max(pixelWidth/video.videoWidth,pixelHeight/video.videoHeight),drawWidth=video.videoWidth*fit,drawHeight=video.videoHeight*fit;
      context.drawImage(video,(pixelWidth-drawWidth)/2,(pixelHeight-drawHeight)/2,drawWidth,drawHeight);
      setHasVideoFrame(true);
    };
    const update=()=>{
      raf=0;
      const rect=hero.getBoundingClientRect(),scrollDistance=Math.max(1,hero.offsetHeight-window.innerHeight),target=Math.max(0,Math.min(1,-rect.top/scrollDistance));
      progress+=(target-progress)*.2;
      if(Math.abs(target-progress)<.001)progress=target;
      const next=rect.bottom<=0?"past":target>=.94?"finale":"start";
      setState(s=>s===next?s:next);
      const duration=Number.isFinite(video.duration)&&video.duration>0?Math.max(0,video.duration-1/30):0,desiredTime=progress*duration;
      if(!seekInFlight&&video.readyState>=2&&performance.now()-lastSeekAt>=70&&Math.abs(desiredTime-video.currentTime)>=.05){
        seekInFlight=true;
        lastSeekAt=performance.now();
        video.currentTime=desiredTime;
      }
      if(!seekInFlight&&Math.abs(desiredTime-video.currentTime)>=.05&&performance.now()-lastSeekAt<70){
        window.clearTimeout(seekTimer);
        seekTimer=window.setTimeout(schedule,70-(performance.now()-lastSeekAt));
      }
      if(Math.abs(target-progress)>.002)raf=requestAnimationFrame(update);
    };
    const schedule=()=>{if(!raf)raf=requestAnimationFrame(update)};
    const onSeeked=()=>{seekInFlight=false;drawFrame();schedule()};
    const onFrameReady=()=>{if(isCoarsePointer)video.pause();drawFrame();schedule()};
    const onScrollEnd=()=>{window.clearTimeout(seekTimer);seekTimer=window.setTimeout(()=>{progress=Math.max(0,Math.min(1,-hero.getBoundingClientRect().top/Math.max(1,hero.offsetHeight-window.innerHeight)));schedule()},120)};
    window.addEventListener("scroll",schedule,{passive:true});
    window.addEventListener("resize",schedule);
    video.addEventListener("seeked",onSeeked);
    video.addEventListener("loadeddata",onFrameReady);
    video.addEventListener("loadedmetadata",schedule);
    window.addEventListener("scrollend",onScrollEnd,{passive:true});
    schedule();
    return()=>{cancelAnimationFrame(raf);window.clearTimeout(seekTimer);window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule);window.removeEventListener("scrollend",onScrollEnd);video.removeEventListener("seeked",onSeeked);video.removeEventListener("loadeddata",onFrameReady);video.removeEventListener("loadedmetadata",schedule)};
  },[]);
  useEffect(()=>{
    const hero=heroRef.current;
    if(!hero)return;
    const heroUi=hero.querySelectorAll<HTMLElement>(".ui");
    const updateOpacity=()=>{
      const opacity=String(Math.max(0,1-Math.max(0,-hero.getBoundingClientRect().top)/72));
      heroUi.forEach(element=>{
        element.style.opacity=opacity;
        element.style.pointerEvents=opacity==="0"?"none":"";
      });
    };
    updateOpacity();
    window.addEventListener("scroll",updateOpacity,{passive:true});
    window.addEventListener("resize",updateOpacity);
    return()=>{window.removeEventListener("scroll",updateOpacity);window.removeEventListener("resize",updateOpacity)};
  },[]);
  useEffect(()=>{const locked=menu||requestOpen||galleryOpen||lightbox!==null||!ready;document.documentElement.classList.toggle("locked",locked);return()=>document.documentElement.classList.remove("locked")},[menu,requestOpen,galleryOpen,lightbox,ready]);
  useEffect(()=>{const els=document.querySelectorAll(".reveal"),o=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("visible")),{threshold:.14});els.forEach(e=>o.observe(e));return()=>o.disconnect()},[]);
  useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.key==="Escape"){setMenu(false);setRequestOpen(false);if(lightbox!==null)setLightbox(null);else setGalleryOpen(false)}if(lightbox!==null&&e.key==="ArrowRight")setLightbox((lightbox+1)%gallery.length);if(lightbox!==null&&e.key==="ArrowLeft")setLightbox((lightbox-1+gallery.length)%gallery.length)};addEventListener("keydown",key);return()=>removeEventListener("keydown",key)},[galleryOpen,lightbox]);
  const openRequest=()=>{setError("");setSent(false);setRequestOpen(true)};
  const submit=(e:FormEvent<HTMLFormElement>)=>{e.preventDefault();const d=new FormData(e.currentTarget),name=String(d.get("name")||"").trim(),phone=String(d.get("phone")||"").trim();if(!name||!/^[+()\d\s-]{7,}$/.test(phone)){setError("Проверьте имя и номер телефона.");return}setSent(true)};
  return <div id="top" onClick={event=>{const target=event.target;if(target instanceof Element&&target.closest('a[href="#contact"]')){event.preventDefault();openRequest()}}}>
    <div className={`preloader ${ready?"done":""}`}><Logo/><div className="load"><i/></div></div>
    <header className={`topbar ${state==="past"?"solid":""} ${state==="flight"?"hide":""}`}><Logo compact/><nav>{nav.map(([l,id])=><a key={id} href={`#${id}`}>{l}</a>)}</nav><div className="actions"><a className="btn light-btn" href="#contact">Оставить заявку</a><button className="btn dark-btn" onClick={()=>setMenu(true)}>Меню</button></div></header>
    <div className={`menu ${menu?"open":""}`}><div><Logo/><button className="btn dark-btn" onClick={()=>setMenu(false)}>Закрыть</button></div><nav>{nav.map(([l,id])=><a key={id} href={`#${id}`} onClick={()=>setMenu(false)}>{l}</a>)}</nav><p>г. Минск, ул. Мстиславца, 10 · +375 (00) 000-00-00</p></div>
    <main>
      <header className={`hero ${state}${hasVideoFrame?" has-video-frame":""}`} ref={heroRef}><div className="sticky"><img ref={heroImageRef} className="hero-still" src={`${A}portrait.png`} alt="" aria-hidden="true" fetchPriority="high"/><video ref={heroVideoRef} className="hero-video" src={`${A}hero.mp4`} poster={`${A}portrait.png`} muted playsInline autoPlay preload="auto" onError={event=>{event.currentTarget.style.opacity="0";console.error("Не удалось загрузить видео АРКА 123; оставлено статичное изображение.")}}/><canvas ref={canvasRef} className="video-canvas" aria-hidden="true"/><div className="vignette"/><div className="meta ui">/ Минск, ул. Мстиславца, 10<br/>/ Мастер-классы и семинары<br/>/ Свет, простор, вид</div><div className="hero-copy ui"><span className="chip">Пространство для мастер-классов и семинаров</span><h1>Встречаемся<br/>напротив Библиотеки.</h1><p>Светлый лофт 123 м² с огромными арочными окнами и видом на Национальную библиотеку.</p><div className="hero-actions"><a className="btn light-btn" href="#contact">Оставить заявку</a><a className="btn ghost-btn" href="#tariffs">Смотреть тарифы</a></div><div className="stats"><span><b>123 м²</b><small>Площадь зала</small></span><span><b>4 × 3,5 м</b><small>Арочные окна</small></span><span><b>Вид</b><small>На Библиотеку</small></span></div></div><a className="tour-card ui" href="#contact"><img src={`${A}space.png`} alt=""/><span><b>Поможем подобрать формат</b><small>Расскажите о вашем мероприятии</small><em>Оставить заявку →</em></span></a><div className="scroll ui">СКРОЛЛ<i/></div><div className="finale"><p>АРКА 123. Встречаемся напротив Библиотеки.</p><div><a className="btn light-btn" href="#contact">Оставить заявку</a><a className="btn ghost-btn" href="#tariffs">Смотреть тарифы</a></div></div></div></header>
      <section id="about" className="section cream"><div className="about"><div className="reveal"><span className="eyebrow">/ Об АРКА 123</span><h2>Арка, окна и 123 квадратных метра света.</h2><p>Название родилось из архитектуры. Дом состоит из двух высоких корпусов, соединённых аркой, а через эту арку с променада открывается вид на Национальную библиотеку.</p><p>Цифры 123 — это площадь помещения. Огромные арочные окна размером 4 × 3,5 метра дают столько света, что вам не понадобится ничего, кроме идеи.</p><div className="big-stats"><span><b>123</b><small>м² пространства</small></span><span><b>4 × 3,5</b><small>м арочные окна</small></span><span><b>2</b><small>окна на Библиотеку</small></span></div></div><figure className="portrait reveal"><div><img src={`${A}04_живой_момент_коммуникации.jpg`} alt="Живая встреча в пространстве АРКА 123"/></div><figcaption><b>Фирменный персонаж компании</b><span>Встретит, проведёт и покажет все залы</span></figcaption></figure></div></section>
      <section id="space" className="section navy"><Heading label="Наше помещение" title="Осмотрите зал так, будто вы уже внутри." copy="Посмотрите видео зала, а затем выберите подходящий формат."/><video className="space-intro-video reveal" src={`${A}3d_new.mp4`} poster={`${A}6.png`} autoPlay loop muted playsInline preload="metadata" aria-label="Видео помещения АРКА 123"/><div className="tabs reveal">{roomLayouts.map((layout,i)=><button key={layout.title} className={tab===i?"active":""} onClick={()=>{setTab(i);setSpacePhoto(0)}}>{["Пустое помещение","Мастер-класс","Рассадка за столами"][i]}</button>)}</div><div className="layout reveal"><div className="space-view" onTouchStart={event=>{spaceTouchStart.current=event.touches[0]?.clientX??null}} onTouchEnd={event=>{const start=spaceTouchStart.current,end=event.changedTouches[0]?.clientX;spaceTouchStart.current=null;if(start!==null&&end!==undefined&&Math.abs(end-start)>48)changeSpacePhoto(start>end?1:-1)}}><img key={`${tab}-${roomLayouts[tab].images[spacePhoto].src}`} src={`${A}${roomLayouts[tab].images[spacePhoto].src}`} alt={roomLayouts[tab].images[spacePhoto].label} loading="lazy"/><button className="space-arrow previous" type="button" aria-label="Предыдущее фото" onClick={()=>changeSpacePhoto(-1)}>←</button><button className="space-arrow next" type="button" aria-label="Следующее фото" onClick={()=>changeSpacePhoto(1)}>→</button><div className="space-caption"><span>{roomLayouts[tab].images[spacePhoto].label}</span><span>{String(spacePhoto+1).padStart(2,"0")} / {String(roomLayouts[tab].images.length).padStart(2,"0")}</span></div></div><div><span className="eyebrow">0{tab+1} / 03</span><h3>{roomLayouts[tab].title}</h3><p>{roomLayouts[tab].description}</p><a href="#contact">Обсудить расстановку →</a></div></div><RoomModelPreview/></section>
      <section id="services" className="section cream"><Heading label="Наши услуги и цены" title="Что входит и сколько это стоит"/><div className="services reveal">{services.map(([n,d,p],i)=><div className="service" key={n}><span>0{i+1}</span><h3>{n}</h3><p>{d}</p><b>{p}</b></div>)}</div></section>
      <section id="gallery" className="section ink"><Heading label="Фотогалерея" title="Галерея пространства"/><div className="gallery gallery-preview reveal">{gallery.slice(0,4).map((image,i)=><button key={image.src} onClick={()=>setGalleryOpen(true)} aria-label={`Открыть фотогалерею, фото ${i+1} из ${gallery.length}`}><img src={galleryImageSrc(image.src)} alt={image.alt} loading="lazy"/></button>)}</div><p className="gallery-hint">Нажмите на любое фото, чтобы открыть галерею</p></section>
      <section id="tariffs" className="section cream"><Heading label="Тарифы и услуги" title="Выберите формат аренды"/><div className="tariffs">{[["Час","Короткая встреча или репетиция",["Минимум 2 часа","85 BYN/час в будни, 110 BYN/час в выходные","Свет, Wi-Fi и помощь администратора"]],["Полдня (до 5 часов)","Мастер-класс или семинар",["400 BYN в будни / 500 BYN в выходные","Мебель по схеме","Кофе-брейк зона"]],["Весь день (до 10 часов)","Большое событие или съёмка",["750 BYN в будни / 950 BYN в выходные","Мебель и подготовка пространства","Проектор и экран — 55 BYN"]]].map(([n,d,list],i)=><article className={`tariff reveal ${i===1?"featured":""}`} key={n as string}>{i===1&&<span className="popular">Выбирают чаще всего</span>}<span className="eyebrow">0{i+1}</span><h3>{n as string}</h3><strong>{["от 85 BYN / час","от 400 BYN","от 750 BYN"][i]}</strong><p>{d as string}</p><ul>{(list as string[]).map(x=><li key={x}>{x}</li>)}</ul><a className={`btn ${i===1?"light-btn":"navy-btn"}`} href="#contact">Оставить заявку</a></article>)}</div></section>
      <section id="reviews" className="section sand"><Heading label="Отзывы" title="Нас рекомендуют"/><div className="reviews">{[["Окна — это что-то. Участницы весь мастер-класс фотографировали вид на Библиотеку.","Анна","мастер-классы по керамике","review-anna.jpg"],["Удобно, что всё готово: стол, проектор, администратор. Приехали и сразу начали.","Игорь","бизнес-тренер","review-igor.jpg"],["Свет идеальный, снимали камерную встречу без дополнительных ламп.","Мария","фотограф","review-maria.jpg"]].map(([q,n,r,avatar])=><blockquote className="reveal" key={n}><span>“</span><p>{q}</p><footer><b>{n}</b><small>{r}</small><img src={`${A}${avatar}`} alt={`Фото ${n}`} loading="lazy"/></footer></blockquote>)}</div></section>
    </main>
    <footer className="footer"><Logo/><nav>{nav.map(([l,id])=><a key={id} href={`#${id}`}>{l}</a>)}</nav><div className="footer-address"><span>г. Минск, ул. Мстиславца, 10</span><a href="tel:+375000000000">+375 (00) 000-00-00</a><a href="mailto:hello@arka123.by">hello@arka123.by</a><span>@arka123 · ежедневно 9:00–22:00</span><button className="btn light-btn footer-request" type="button" onClick={openRequest}>Оставить заявку</button></div><div className="footer-bottom"><span>© 2026 АРКА 123. Все права защищены.</span><a href="#top">Наверх ↑</a></div></footer>
    {requestOpen&&<div className="request-modal" role="presentation" onMouseDown={event=>{if(event.target===event.currentTarget)setRequestOpen(false)}}><section className="request-dialog" role="dialog" aria-modal="true" aria-labelledby="request-title"><button className="request-close" type="button" aria-label="Закрыть окно" onClick={()=>setRequestOpen(false)}>×</button>{sent?<div className="success"><span>123</span><h3 id="request-title">Спасибо!</h3><p>Мы свяжемся с вами в ближайшее время.</p></div>:<><span className="eyebrow">/ Заявка</span><h2 id="request-title">Оставьте заявку</h2><p className="request-intro">Заполните форму — мы свяжемся с вами в течение часа.</p><form onSubmit={submit} noValidate><label>Имя<input name="name" autoComplete="name" autoFocus placeholder="Как к вам обращаться"/></label><label>Телефон<input name="phone" autoComplete="tel" placeholder="+375 (__) ___-__-__"/></label><label>Формат<select name="format"><option>Мастер-класс</option><option>Семинар</option><option>Камерная встреча</option><option>Съёмка</option></select></label><label>Дата<input name="date" type="date"/></label><label className="request-full">Комментарий<textarea name="comment" rows={3} placeholder="Расскажите о мероприятии"/></label><label className="check request-full"><input type="checkbox" required/> Согласен на обработку данных</label>{error&&<p className="error request-full" aria-live="polite">{error}</p>}<button className="btn navy-btn request-full" type="submit">Отправить заявку</button></form></>}</section></div>}
    {galleryOpen&&<div className="gallery-index-modal" role="dialog" aria-modal="true" aria-label="Все фотографии АРКА 123" onClick={event=>{const target=event.target;if(target instanceof Element&&!target.closest(".gallery-index-header, .gallery-index-grid button"))setGalleryOpen(false)}}><div className="gallery-index-header"><div><span className="eyebrow">/ Фотогалерея</span><h2>Все фотографии</h2><span>{gallery.length} фото</span></div><button className="close" type="button" aria-label="Закрыть фотогалерею" onClick={()=>setGalleryOpen(false)}>Закрыть ×</button></div><div className="gallery-index-grid">{gallery.map((image,index)=><button key={`${image.src}-${index}`} type="button" aria-label={`Открыть фото ${index+1}: ${image.alt}`} onClick={()=>setLightbox(index)}><img src={galleryImageSrc(image.src)} alt="" loading="lazy"/></button>)}</div></div>}
    {lightbox!==null&&<div className="lightbox gallery-lightbox" role="dialog" aria-modal="true" aria-label="Просмотр фото АРКА 123" onClick={event=>{const target=event.target;if(target instanceof Element&&!target.closest(".close, .gallery-nav, .gallery-thumbnails button, .gallery-stage img")){setLightbox(null);setGalleryOpen(false)}}}><button className="close" type="button" aria-label="Вернуться ко всем фотографиям" onClick={()=>setLightbox(null)}>Назад к галерее ×</button><div className="gallery-viewer"><div className="gallery-stage" onTouchStart={event=>{galleryTouchStart.current=event.touches[0]?.clientX??null}} onTouchEnd={event=>{const start=galleryTouchStart.current,end=event.changedTouches[0]?.clientX;galleryTouchStart.current=null;if(start!==null&&end!==undefined&&Math.abs(end-start)>48)setLightbox(current=>current===null?null:(current+(start>end?1:-1)+gallery.length)%gallery.length)}}><button className="gallery-nav" type="button" aria-label="Предыдущее фото" onClick={()=>setLightbox((lightbox-1+gallery.length)%gallery.length)}>←</button><figure><img src={galleryImageSrc(gallery[lightbox].src)} alt={gallery[lightbox].alt}/><figcaption>{String(lightbox+1).padStart(2,"0")} / {gallery.length}</figcaption></figure><button className="gallery-nav" type="button" aria-label="Следующее фото" onClick={()=>setLightbox((lightbox+1)%gallery.length)}>→</button></div><div className="gallery-thumbnails" aria-label="Все фотографии"><div>{gallery.map((image,index)=><button className={index===lightbox?"active":""} key={`${image.src}-${index}`} type="button" aria-label={`Показать фото ${index+1}: ${image.alt}`} aria-current={index===lightbox?"true":undefined} onClick={()=>setLightbox(index)}><img src={galleryImageSrc(image.src)} alt="" loading="lazy"/></button>)}</div></div></div></div>}
  </div>
}
