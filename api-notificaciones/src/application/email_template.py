from string import Template

def generar_html_desde_evento(evento: dict) -> str:
    data = evento.get("data", {})
    remitente = data.get("remitente", {})

    nombre = remitente.get("nombre", "[Nombre del solicitante]")
    titulo_tesis = data.get("tituloProyecto", "[Título de tesis]")
    area = data.get("areaInvestigacion", "[Área de investigación]")
    universidad = data.get("universidad", "[Universidad]")
    id_remitente = remitente.get("id", "[ID]")

    url = f"https://tesis-connect.netlify.app/profile/{id_remitente}"

    html = Template("""
    <html>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <h2 style="color: #2c3e50;">NUEVA SOLICITUD DE ASESORÍA</h2>
            <p><strong>$nombre</strong> desea que lo asesores en su proyecto de tesis.</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr><td style="padding: 8px;"><strong>Título del proyecto:</strong></td><td>$tesis</td></tr>
                <tr><td style="padding: 8px;"><strong>Área de investigación:</strong></td><td>$area</td></tr>
                <tr><td style="padding: 8px;"><strong>Universidad:</strong></td><td>$universidad</td></tr>
            </table>

            <p style="margin-top: 20px;">Puedes ver más detalles y responder a esta solicitud desde la plataforma</p>
            <a href="$url" style="display: inline-block; padding: 10px 20px; background-color: #2e86de; color: white; text-decoration: none; border-radius: 5px;">Ver solicitud</a>

            <p style="margin-top: 40px; font-size: 12px; color: gray;">Este es un mensaje automático generado por la plataforma TesisConnect.</p>
        </div>
    </body>
    </html>
    """)

    return html.substitute(
        nombre=nombre,
        tesis=titulo_tesis,
        area=area,
        universidad=universidad,
        url=url
    )
