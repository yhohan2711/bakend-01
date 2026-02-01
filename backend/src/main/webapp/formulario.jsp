<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <!DOCTYPE html>
    <html lang="es">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Formulario de contacto con métodos GET y POST">
        <title>Formulario JSP - GET y POST</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            :root {
                --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                --success-gradient: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
                --error-gradient: linear-gradient(135deg, #eb3349 0%, #f45c43 100%);
                --info-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                --card-bg: rgba(255, 255, 255, 0.95);
                --shadow-lg: 0 20px 60px rgba(0, 0, 0, 0.15);
                --shadow-md: 0 10px 30px rgba(0, 0, 0, 0.1);
            }

            body {
                font-family: 'Inter', sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                position: relative;
                overflow-x: hidden;
            }

            body::before {
                content: '';
                position: absolute;
                width: 300px;
                height: 300px;
                background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
                border-radius: 50%;
                top: -150px;
                left: -150px;
                animation: float 6s ease-in-out infinite;
            }

            body::after {
                content: '';
                position: absolute;
                width: 400px;
                height: 400px;
                background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
                border-radius: 50%;
                bottom: -200px;
                right: -200px;
                animation: float 8s ease-in-out infinite reverse;
            }

            @keyframes float {

                0%,
                100% {
                    transform: translateY(0) rotate(0deg);
                }

                50% {
                    transform: translateY(20px) rotate(180deg);
                }
            }

            .container {
                width: 100%;
                max-width: 900px;
                background: var(--card-bg);
                backdrop-filter: blur(10px);
                border-radius: 24px;
                box-shadow: var(--shadow-lg);
                overflow: hidden;
                animation: slideUp 0.5s ease-out;
                position: relative;
                z-index: 1;
            }

            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }

                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .header {
                background: var(--primary-gradient);
                padding: 40px;
                text-align: center;
                color: white;
                position: relative;
                overflow: hidden;
            }

            .header::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h100v100H0z" fill="none"/><circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.1)" stroke-width="2" fill="none"/></svg>');
                opacity: 0.3;
                top: 0;
                left: 0;
            }

            .header h1 {
                font-size: 2.5rem;
                font-weight: 700;
                margin-bottom: 10px;
                position: relative;
                z-index: 1;
            }

            .header p {
                font-size: 1.1rem;
                opacity: 0.95;
                position: relative;
                z-index: 1;
            }

            .content {
                padding: 40px;
            }

            .method-tabs {
                display: flex;
                gap: 15px;
                margin-bottom: 30px;
                background: #f8f9fa;
                padding: 8px;
                border-radius: 12px;
            }

            .tab-btn {
                flex: 1;
                padding: 15px 30px;
                border: none;
                background: transparent;
                border-radius: 8px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                color: #666;
            }

            .tab-btn.active {
                background: var(--primary-gradient);
                color: white;
                box-shadow: var(--shadow-md);
                transform: translateY(-2px);
            }

            .tab-btn:hover:not(.active) {
                background: rgba(102, 126, 234, 0.1);
            }

            .form-section {
                display: none;
            }

            .form-section.active {
                display: block;
                animation: fadeIn 0.3s ease-out;
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }

                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .form-group {
                margin-bottom: 25px;
            }

            label {
                display: block;
                margin-bottom: 8px;
                font-weight: 600;
                color: #333;
                font-size: 0.95rem;
            }

            input[type="text"],
            input[type="email"],
            textarea,
            select {
                width: 100%;
                padding: 14px 18px;
                border: 2px solid #e0e0e0;
                border-radius: 10px;
                font-size: 1rem;
                font-family: 'Inter', sans-serif;
                transition: all 0.3s ease;
                background: white;
            }

            input:focus,
            textarea:focus,
            select:focus {
                outline: none;
                border-color: #667eea;
                box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                transform: translateY(-2px);
            }

            textarea {
                resize: vertical;
                min-height: 120px;
            }

            .submit-btn {
                width: 100%;
                padding: 16px;
                background: var(--primary-gradient);
                color: white;
                border: none;
                border-radius: 10px;
                font-size: 1.1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: var(--shadow-md);
                position: relative;
                overflow: hidden;
            }

            .submit-btn::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: translate(-50%, -50%);
                transition: width 0.6s, height 0.6s;
            }

            .submit-btn:hover::before {
                width: 300px;
                height: 300px;
            }

            .submit-btn:hover {
                transform: translateY(-3px);
                box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
            }

            .submit-btn:active {
                transform: translateY(-1px);
            }

            .result-box {
                margin-top: 30px;
                padding: 25px;
                border-radius: 12px;
                animation: slideDown 0.4s ease-out;
            }

            @keyframes slideDown {
                from {
                    opacity: 0;
                    max-height: 0;
                    padding: 0 25px;
                }

                to {
                    opacity: 1;
                    max-height: 500px;
                    padding: 25px;
                }
            }

            .result-success {
                background: linear-gradient(135deg, rgba(17, 153, 142, 0.1) 0%, rgba(56, 239, 125, 0.1) 100%);
                border-left: 4px solid #11998e;
            }

            .result-info {
                background: linear-gradient(135deg, rgba(79, 172, 254, 0.1) 0%, rgba(0, 242, 254, 0.1) 100%);
                border-left: 4px solid #4facfe;
            }

            .result-box h3 {
                margin-bottom: 15px;
                font-size: 1.3rem;
                color: #333;
            }

            .result-item {
                padding: 10px 0;
                border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            }

            .result-item:last-child {
                border-bottom: none;
            }

            .result-label {
                font-weight: 600;
                color: #667eea;
                margin-right: 10px;
            }

            .method-badge {
                display: inline-block;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 0.85rem;
                font-weight: 600;
                margin-left: 10px;
            }

            .method-get {
                background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                color: white;
            }

            .method-post {
                background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
                color: white;
            }

            .info-box {
                background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
                padding: 20px;
                border-radius: 10px;
                margin-bottom: 25px;
                border-left: 4px solid #667eea;
            }

            .info-box h4 {
                color: #667eea;
                margin-bottom: 10px;
                font-size: 1rem;
            }

            .info-box p {
                color: #666;
                line-height: 1.6;
                font-size: 0.95rem;
            }

            @media (max-width: 768px) {
                .header h1 {
                    font-size: 2rem;
                }

                .method-tabs {
                    flex-direction: column;
                }

                .content {
                    padding: 25px;
                }
            }
        </style>
    </head>

    <body>
        <div class="container">
            <div class="header">
                <h1>🚀 Formulario JSP</h1>
                <p>Demostración de métodos GET y POST</p>
            </div>

            <div class="content">
                <div class="method-tabs">
                    <button class="tab-btn active" onclick="switchTab('get')">
                        Método GET 📤
                    </button>
                    <button class="tab-btn" onclick="switchTab('post')">
                        Método POST 📥
                    </button>
                </div>

                <!-- Sección GET -->
                <div id="get-section" class="form-section active">
                    <div class="info-box">
                        <h4>📖 Método GET</h4>
                        <p>El método GET envía los datos a través de la URL. Es ideal para búsquedas y consultas que no
                            modifican datos. Los parámetros son visibles en la barra de direcciones.</p>
                    </div>

                    <form method="get" action="formulario.jsp">
                        <input type="hidden" name="formType" value="get">

                        <div class="form-group">
                            <label for="get-nombre">👤 Nombre:</label>
                            <input type="text" id="get-nombre" name="nombre" placeholder="Ingresa tu nombre" required>
                        </div>

                        <div class="form-group">
                            <label for="get-email">📧 Email:</label>
                            <input type="email" id="get-email" name="email" placeholder="tu@email.com" required>
                        </div>

                        <div class="form-group">
                            <label for="get-ciudad">🏙️ Ciudad:</label>
                            <select id="get-ciudad" name="ciudad" required>
                                <option value="">Selecciona una ciudad</option>
                                <option value="Bogotá">Bogotá</option>
                                <option value="Medellín">Medellín</option>
                                <option value="Cali">Cali</option>
                                <option value="Barranquilla">Barranquilla</option>
                                <option value="Cartagena">Cartagena</option>
                            </select>
                        </div>

                        <button type="submit" class="submit-btn">
                            Enviar con GET 🚀
                        </button>
                    </form>
                </div>

                <!-- Sección POST -->
                <div id="post-section" class="form-section">
                    <div class="info-box">
                        <h4>📖 Método POST</h4>
                        <p>El método POST envía los datos en el cuerpo de la petición HTTP. Es ideal para enviar
                            información sensible, archivos, o grandes cantidades de datos. Los parámetros no son
                            visibles en la URL.</p>
                    </div>

                    <form method="post" action="formulario.jsp">
                        <input type="hidden" name="formType" value="post">

                        <div class="form-group">
                            <label for="post-nombre">👤 Nombre:</label>
                            <input type="text" id="post-nombre" name="nombre" placeholder="Ingresa tu nombre" required>
                        </div>

                        <div class="form-group">
                            <label for="post-email">📧 Email:</label>
                            <input type="email" id="post-email" name="email" placeholder="tu@email.com" required>
                        </div>

                        <div class="form-group">
                            <label for="post-mensaje">💬 Mensaje:</label>
                            <textarea id="post-mensaje" name="mensaje" placeholder="Escribe tu mensaje aquí..."
                                required></textarea>
                        </div>

                        <div class="form-group">
                            <label for="post-servicio">🛠️ Servicio de interés:</label>
                            <select id="post-servicio" name="servicio" required>
                                <option value="">Selecciona un servicio</option>
                                <option value="Consulta">Consulta</option>
                                <option value="Soporte Técnico">Soporte Técnico</option>
                                <option value="Ventas">Ventas</option>
                                <option value="Información General">Información General</option>
                            </select>
                        </div>

                        <button type="submit" class="submit-btn">
                            Enviar con POST 📨
                        </button>
                    </form>
                </div>

                <% // Procesar datos recibidos String formType=request.getParameter("formType"); String
                    nombre=request.getParameter("nombre"); String email=request.getParameter("email"); String
                    metodo=request.getMethod(); // GET o POST if (formType !=null && nombre !=null && email !=null) {
                    String resultClass="result-success" ; if ("get".equals(formType)) { resultClass="result-info" ; } %>
                    <div class="result-box <%= resultClass %>">
                        <h3>✅ Datos Recibidos Correctamente</h3>

                        <div class="result-item">
                            <span class="result-label">Método HTTP:</span>
                            <span>
                                <%= metodo %>
                            </span>
                            <span class="method-badge <%= metodo.equals(" GET") ? "method-get" : "method-post" %>">
                                <%= metodo %>
                            </span>
                        </div>

                        <div class="result-item">
                            <span class="result-label">Tipo de Formulario:</span>
                            <span>
                                <%= formType.toUpperCase() %>
                            </span>
                        </div>

                        <div class="result-item">
                            <span class="result-label">Nombre:</span>
                            <span>
                                <%= nombre %>
                            </span>
                        </div>

                        <div class="result-item">
                            <span class="result-label">Email:</span>
                            <span>
                                <%= email %>
                            </span>
                        </div>

                        <% if ("get".equals(formType)) { String ciudad=request.getParameter("ciudad"); if (ciudad
                            !=null) { %>
                            <div class="result-item">
                                <span class="result-label">Ciudad:</span>
                                <span>
                                    <%= ciudad %>
                                </span>
                            </div>
                            <% } } else if ("post".equals(formType)) { String mensaje=request.getParameter("mensaje");
                                String servicio=request.getParameter("servicio"); if (mensaje !=null) { %>
                                <div class="result-item">
                                    <span class="result-label">Mensaje:</span>
                                    <span>
                                        <%= mensaje %>
                                    </span>
                                </div>
                                <% } if (servicio !=null) { %>
                                    <div class="result-item">
                                        <span class="result-label">Servicio:</span>
                                        <span>
                                            <%= servicio %>
                                        </span>
                                    </div>
                                    <% } } %>

                                        <div class="result-item">
                                            <span class="result-label">Hora de procesamiento:</span>
                                            <span>
                                                <%= new java.util.Date() %>
                                            </span>
                                        </div>

                                        <div class="result-item">
                                            <span class="result-label">IP del cliente:</span>
                                            <span>
                                                <%= request.getRemoteAddr() %>
                                            </span>
                                        </div>
                    </div>
                    <% } %>
            </div>
        </div>

        <script>
            function switchTab(tab) {
                // Actualizar botones
                const buttons = document.querySelectorAll('.tab-btn');
                buttons.forEach(btn => btn.classList.remove('active'));
                event.target.classList.add('active');

                // Actualizar secciones
                const sections = document.querySelectorAll('.form-section');
                sections.forEach(section => section.classList.remove('active'));

                if (tab === 'get') {
                    document.getElementById('get-section').classList.add('active');
                } else {
                    document.getElementById('post-section').classList.add('active');
                }
            }

            // Animación suave al hacer scroll en dispositivos móviles
            document.addEventListener('DOMContentLoaded', function () {
                const inputs = document.querySelectorAll('input, textarea, select');
                inputs.forEach(input => {
                    input.addEventListener('focus', function () {
                        this.parentElement.style.transform = 'scale(1.01)';
                        this.parentElement.style.transition = 'transform 0.2s ease';
                    });

                    input.addEventListener('blur', function () {
                        this.parentElement.style.transform = 'scale(1)';
                    });
                });
            });
        </script>
    </body>

    </html>