export async function POST(request: Request) {
    try {
        const req = await request.json()
        const response = await fetch("http://nginx:80/api/books/" + req.id + "/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(req.form)
        });
        const data = await response.json();
        console.log("Dados recebidos da API externa:", data);
        return Response.json({ data });
    } catch (error) {
        console.error("Erro na chamada fetch:", error);
        return Response.json({ error: "Não foi possível conectar à API externa." + error});
    }
}