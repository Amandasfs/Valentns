// Desenvolvido por Amanda de Freitas
import readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(`
if (temAmor) {
  print("❤️ Feliz Dia dos Namorados!");
}
else if (temPet) {
  print("🐶🐱 Companhia fiel detectada.");
}
else {
  print("⚠️ Relacionamento não encontrado.");
  print("🚀 Continue evoluindo. Novas conexões podem surgir.");
}
`);

rl.question("Você tem um grande amor? (true/false): ", (amor) => {
  const temAmor = amor.toLowerCase() === "true";

  if (temAmor) {
    console.log("\n❤️ Feliz Dia dos Namorados!");
    rl.close();
    return;
  }

  rl.question(
    "Você tem um cachorro ou gato? (true/false): ",
    (pet) => {
      const temPet = pet.toLowerCase() === "true";

      if (temPet) {
        console.log("\n🐶🐱 Você vai ficar bem.");
      } else {
        console.log("\n⚠️ Erro 404: Amor não encontrado.");
        console.log("🚀 Mas calma, o deploy da felicidade continua.");
      }

      rl.close();
    }
  );
});