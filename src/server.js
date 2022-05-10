import App from "./";

const PORT = process.env.PORT || 3333;

App.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
