// ========================================
// 主JavaScript文件 - 液态玻璃简历网站
// ========================================

// 全局变量
// Three.js相关变量已删除

// ========================================
// 初始化函数
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // 初始化AOS（动画库）
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
    
    // 初始化导航
    initNavigation();
    // 初始化滚动动画
    initScrollEffects();
    // 初始化数字统计
    initCounters();
    // 初始化技能条
    initSkillBars();
    // 初始化项目轮播
    initProjectsCarousel();
    // 初始化3D卡片特效
    init3DCardEffect(); // 添加3D卡片特效
});

// ========================================
// 3D卡片特效
// ========================================
function init3DCardEffect() {
    const cards = document.querySelectorAll('.liquid-glass');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.1s ease-out';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * 10; // X轴旋转角度
            const rotateY = ((x - centerX) / centerX) * -10; // Y轴旋转角度
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.5s ease-out';
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// ========================================
// 导航控制
// ========================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    // 滚动时改变导航栏样式
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 菜单切换按钮
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // 点击导航链接平滑滚动到相应部分
    navLinkItems.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除其他链接的激活状态
            navLinkItems.forEach(l => l.classList.remove('active'));
            
            // 给当前链接添加激活状态
            this.classList.add('active');
            
            // 平滑滚动到目标部分
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // 关闭移动设备菜单
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // 滚动时更新导航链接的激活状态
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('.section, .hero-section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ========================================
// 滚动动画
// ========================================
function initScrollEffects() {
    // 监听页面滚动事件
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        // 背景模糊效果
        const navbar = document.getElementById('navbar');
        const blur = Math.min(scrolled / 10, 20);
        navbar.style.backdropFilter = `blur(${blur}px)`;
    });
}

// ========================================
// 数字统计
// ========================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // 更新速度
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const label = counter.nextElementSibling.textContent;
                const hasPlus = label.includes('+');
                
                const updateCount = () => {
                    const count = +counter.innerText;
                    const increment = target / speed;
                    
                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 10);
                    } else {
                        counter.innerText = target + (hasPlus ? '+' : '');
                    }
                };
                
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// ========================================
// 技能条动画
// ========================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const proficiencyBars = document.querySelectorAll('.proficiency-bar');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.getAttribute('data-progress') || bar.getAttribute('data-proficiency');
                
                setTimeout(() => {
                    bar.style.width = progress + '%';
                    bar.classList.add('animated');
                }, 200);
                
                observer.unobserve(bar);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => observer.observe(bar));
    proficiencyBars.forEach(bar => observer.observe(bar));
}

// ========================================
// 项目轮播组件
// ========================================
function initProjectsCarousel() {
    const carousel = document.getElementById('projectsCarousel');
    const prevBtn = document.getElementById('prevProject');
    const nextBtn = document.getElementById('nextProject');
    const indicatorsContainer = document.getElementById('projectIndicators');
    
    if (!carousel || !prevBtn || !nextBtn) {
        console.error('Carousel elements not found!');
        return;
    }
    
    const originalCards = Array.from(carousel.querySelectorAll('.project-card'));
    const totalProjects = originalCards.length;
    let currentIndex = 0;
    let isTransitioning = false;
    
    console.log('Carousel initialized:', {
        carousel: !!carousel,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn,
        totalProjects
    });
    
    // 设置无限循环
    function setupInfiniteLoop() {
        carousel.innerHTML = '';
        
        // 添加克隆项到末尾
        for (let i = totalProjects - 3; i < totalProjects; i++) {
            const clone = originalCards[i].cloneNode(true);
            clone.classList.add('clone');
            carousel.appendChild(clone);
        }
        
        // 添加原始项目
        originalCards.forEach(card => {
            carousel.appendChild(card);
        });
        
        // 添加克隆项到开头
        for (let i = 0; i < 3; i++) {
            const clone = originalCards[i].cloneNode(true);
            clone.classList.add('clone');
            carousel.appendChild(clone);
        }
        
        currentIndex = 3;
        carousel.style.transition = 'none';
        updateCarouselPosition(false);
    }
    
    // 获取卡片宽度
    function getCardWidth() {
        const cards = carousel.querySelectorAll('.project-card');
        if (cards.length === 0) return 0;
        const firstCard = cards[0];
        const cardWidth = firstCard.offsetWidth;
        const gap = 30;
        return cardWidth + gap;
    }
    
    // 创建分页指示器
    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        
        for (let i = 0; i < totalProjects; i++) {
            const dot = document.createElement('div');
            dot.classList.add('indicator-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(dot);
        }
    }
    
    // 更新分页指示器
    function updateIndicators() {
        const dots = indicatorsContainer.querySelectorAll('.indicator-dot');
        const realIndex = (currentIndex - 3 + totalProjects) % totalProjects;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === realIndex);
        });
    }
    
    // 更新轮播位置
    function updateCarouselPosition(animate = true) {
        const cardWidth = getCardWidth();
        const offset = -currentIndex * cardWidth;
        
        carousel.style.transition = animate ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
        carousel.style.transform = `translateX(${offset}px)`;
        updateIndicators();
        
        console.log('Position updated:', { currentIndex, realIndex: currentIndex - 3, offset });
    }
    
    // 跳转到指定幻灯片
    function goToSlide(index) {
        if (isTransitioning) return;
        currentIndex = index + 3;
        updateCarouselPosition();
    }
    
    // 上一页幻灯片
    function prevSlide() {
        if (isTransitioning) return;
        console.log('Prev slide');
        isTransitioning = true;
        
        currentIndex--;
        updateCarouselPosition();
        
        setTimeout(() => {
            if (currentIndex < 3) {
                currentIndex = totalProjects + 2;
                updateCarouselPosition(false);
            }
            isTransitioning = false;
        }, 500);
    }
    
    // 下一页幻灯片
    function nextSlide() {
        if (isTransitioning) return;
        console.log('Next slide');
        isTransitioning = true;
        
        currentIndex++;
        updateCarouselPosition();
        
        setTimeout(() => {
            if (currentIndex >= totalProjects + 3) {
                currentIndex = 3;
                updateCarouselPosition(false);
            }
            isTransitioning = false;
        }, 500);
    }
    
    // 事件监听器
    prevBtn.addEventListener('click', () => {
        console.log('Prev button clicked!');
        prevSlide();
    });
    
    nextBtn.addEventListener('click', () => {
        console.log('Next button clicked!');
        nextSlide();
    });
    
    // 键盘导航
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // 触摸滑动
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
    });
    
    // 窗口大小调整
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateCarouselPosition(false);
        }, 250);
    });
    
    // 初始化
    setupInfiniteLoop();
    createIndicators();
    
    // 请求动画帧更新
    requestAnimationFrame(() => {
        updateCarouselPosition(false);
    });
}

// ========================================
// 鼠标移动视差效果
// ========================================
function initParallax() {
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        // 移动液态玻璃元素
        const glassElements = document.querySelectorAll('.liquid-glass');
        glassElements.forEach(element => {
            const speed = element.dataset.speed || 5;
            const x = mouseX * speed;
            const y = mouseY * speed;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// ========================================
// 平滑滚动到锚点
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// 函数节流 - 限制函数调用频率
// ========================================
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// 页面加载事件
// ========================================
window.addEventListener('load', () => {
    // 页面加载完成后添加样式
    document.body.classList.add('loaded');
    
    // 英雄部分淡入效果
    const hero = document.querySelector('.hero-section');
    if (hero) {
        hero.style.opacity = '0';
        setTimeout(() => {
            hero.style.transition = 'opacity 1s ease';
            hero.style.opacity = '1';
        }, 100);
    }
});

// ========================================
// 控制台彩蛋
// ========================================
console.log('%csuperyao - 三维扫描建模工程师', 'color: #00ffff; font-size: 20px; font-weight: bold;');
console.log('%c期待与您的合作！', 'color: #00ff88; font-size: 14px;');
console.log('%c联系方式请查看页面', 'color: #00ffff; font-size: 14px;');

