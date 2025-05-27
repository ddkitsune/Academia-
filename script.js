document.addEventListener('DOMContentLoaded', () => {
    // Manejo del iframe de video (si existe en la página)
    const iframe = document.querySelector('iframe');
    if (iframe) {
        // Agregar un evento para cuando el iframe esté listo
        iframe.addEventListener('load', () => {
            console.log('El video está listo para reproducirse');
        });

        // Función para verificar si el iframe está en pantalla completa
        function checkFullscreen() {
            if (document.fullscreenElement) {
                console.log('El video está en pantalla completa');
            }
        }

        // Escuchar cambios en el estado de pantalla completa
        document.addEventListener('fullscreenchange', checkFullscreen);
    }
    
    // Manejo de pestañas (si existen en la página)
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remover clase active de todos los botones y contenidos
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Añadir clase active al botón clickeado
                button.classList.add('active');
                
                // Mostrar el contenido correspondiente
                const tabId = button.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Manejo de lecciones (si existen en la página)
    const lessonItems = document.querySelectorAll('.lesson-item');
    
    if (lessonItems.length > 0) {
        lessonItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remover clase current de todas las lecciones
                lessonItems.forEach(lesson => lesson.classList.remove('current'));
                
                // Añadir clase current a la lección clickeada
                item.classList.add('current');
                
                // Aquí se podría añadir lógica para cargar el video correspondiente
                console.log('Cambiando a la lección:', item.querySelector('.lesson-info span').textContent);
            });
        });
    }
    
    // Manejo de botones de navegación (si existen en la página)
    const btnPrev = document.querySelector('.btn-prev');
    const btnNext = document.querySelector('.btn-next');
    
    if (btnPrev && btnNext) {
        btnPrev.addEventListener('click', () => {
            const currentLesson = document.querySelector('.lesson-item.current');
            const prevLesson = currentLesson.previousElementSibling;
            
            if (prevLesson) {
                currentLesson.classList.remove('current');
                prevLesson.classList.add('current');
                console.log('Navegando a la lección anterior');
            } else {
                console.log('Ya estás en la primera lección');
            }
        });
        
        btnNext.addEventListener('click', () => {
            const currentLesson = document.querySelector('.lesson-item.current');
            const nextLesson = currentLesson.nextElementSibling;
            
            if (nextLesson) {
                currentLesson.classList.remove('current');
                nextLesson.classList.add('current');
                console.log('Navegando a la siguiente lección');
            } else {
                console.log('Ya estás en la última lección');
            }
        });
    }
    
    // Manejo del menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const userMenu = document.querySelector('.user-menu');
    
    if (menuToggle && mainNav && userMenu) {
        menuToggle.addEventListener('click', () => {
            mainNav.style.display = mainNav.style.display === 'block' ? 'none' : 'block';
            userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';
        });
        
        // Ajustar el menú en cambios de tamaño de ventana
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                mainNav.style.display = '';
                userMenu.style.display = '';
            }
        });
    }
    
    // Manejo del formulario de comentarios (si existe en la página)
    const commentForm = document.querySelector('.comment-form');
    
    if (commentForm) {
        const commentTextarea = commentForm.querySelector('textarea');
        const btnSubmit = commentForm.querySelector('.btn-submit');
        const commentsList = document.querySelector('.comments-list');
        
        btnSubmit.addEventListener('click', () => {
            const commentText = commentTextarea.value.trim();
            
            if (commentText) {
                // Crear nuevo comentario
                const newComment = document.createElement('div');
                newComment.className = 'comment-item';
                newComment.innerHTML = `
                    <div class="comment-avatar">
                        <img src="https://via.placeholder.com/40" alt="Avatar">
                    </div>
                    <div class="comment-content">
                        <div class="comment-header">
                            <h4>Usuario</h4>
                            <div class="rating">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                        </div>
                        <p>${commentText}</p>
                    </div>
                `;
                
                // Añadir comentario al inicio de la lista
                commentsList.insertBefore(newComment, commentsList.firstChild);
                
                // Limpiar textarea
                commentTextarea.value = '';
                
                console.log('Comentario añadido');
            }
        });
    }
    
    // Manejo de las FAQ (si existen en la página)
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Toggle la clase active
                item.classList.toggle('active');
                
                // Cambiar el icono
                const icon = item.querySelector('.faq-toggle i');
                if (item.classList.contains('active')) {
                    icon.className = 'fas fa-minus';
                } else {
                    icon.className = 'fas fa-plus';
                }
            });
        });
    }
    
    // Manejo de los filtros de categoría en la página de instructores
    const categoryButtons = document.querySelectorAll('.category-btn');
    const instructorCards = document.querySelectorAll('.instructor-card');
    
    if (categoryButtons.length > 0 && instructorCards.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remover clase active de todos los botones
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Añadir clase active al botón clickeado
                button.classList.add('active');
                
                // Filtrar instructores
                const category = button.getAttribute('data-category');
                
                instructorCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Manejo del slider de testimonios
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    
    if (testimonialsSlider && testimonialPrev && testimonialNext) {
        testimonialNext.addEventListener('click', () => {
            testimonialsSlider.scrollBy({
                left: 400,
                behavior: 'smooth'
            });
        });
        
        testimonialPrev.addEventListener('click', () => {
            testimonialsSlider.scrollBy({
                left: -400,
                behavior: 'smooth'
            });
        });
    }
    
    // Manejo de los filtros en la página de cursos
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox input');
    const btnFilterApply = document.querySelector('.btn-filter-apply');
    const btnFilterReset = document.querySelector('.btn-filter-reset');
    
    if (filterCheckboxes.length > 0 && btnFilterApply && btnFilterReset) {
        btnFilterApply.addEventListener('click', () => {
            // Aquí se implementaría la lógica para filtrar los cursos
            console.log('Aplicando filtros...');
            
            // Ejemplo: obtener categorías seleccionadas
            const selectedCategories = Array.from(document.querySelectorAll('.filter-checkbox input[name="category"]:checked'))
                .map(checkbox => checkbox.value);
            
            console.log('Categorías seleccionadas:', selectedCategories);
        });
        
        btnFilterReset.addEventListener('click', () => {
            // Desmarcar todos los checkboxes
            filterCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            
            console.log('Filtros restablecidos');
        });
    }
    
    // Manejo del formulario de contacto
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Aquí se implementaría la lógica para enviar el formulario
            console.log('Enviando formulario de contacto...');
            
            // Ejemplo: obtener datos del formulario
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            console.log('Datos del formulario:', formValues);
            
            // Mostrar mensaje de éxito (simulado)
            alert('¡Mensaje enviado con éxito! Te contactaremos pronto.');
            
            // Limpiar formulario
            contactForm.reset();
        });
    }
});