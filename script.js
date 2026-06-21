const inputNumber = document.getElementById("input");

const sourceUnit = document.getElementById("sourceUnit");
const sourceRelatedBoxes = document.querySelectorAll(".sourceUnit");

const targetUnit = document.getElementById("targetUnit");
const targetRelatedBoxes = document.querySelectorAll(".targetUnit");

const submitBtn = document.querySelector(".submit");
const outputText = document.querySelector(".output");

const conversionSheet =
{
  centimetro :
  {
    centibetro : 1 / 1.92,
    metro : 1 / 100,
    betro : 1 / 192
  },
  centibetro :
  {
    centimetro : 1.92,
    metro : 1.92 / 100,
    betro : 1 / 100
  },
  metro :
  {
    centimetro : 100,
    centibetro : 100 / 1.92,
    betro : 1 / 1.92
  },
  betro :
  {
    centimetro : 192,
    centibetro : 100,
    metro : 1.92
  },
}

function ResetState()
{
  inputNumber.classList.remove('error');
  sourceRelatedBoxes.forEach(b => b.classList.remove('error'));
  targetRelatedBoxes.forEach(b => b.classList.remove('error'));
  outputText.classList.remove('error');
  outputText.textContent = "Sua conversão aparecerá aqui!";
}

function ErrorNoMeasureToConvert()
{
  inputNumber.classList.add('error');
  outputText.classList.add('error');
  outputText.textContent
    = "Insira um número para a conversão!";
}

function ErrorNoSourceUnitSelected()
{
  sourceRelatedBoxes.forEach((box) => {
    box.classList.add('error');
  })

  outputText.classList.add('error');
  outputText.textContent
    = "Selecione uma unidade para converter de!";
}

function ErrorNoTargetUnitSelected()
{
  targetRelatedBoxes.forEach((box) => {
    box.classList.add('error');
  })

  outputText.classList.add('error');
  outputText.textContent
    = "Selecione uma unidade para converter para!";
}

submitBtn.addEventListener('click', () => {

  ResetState();

  let numToBeConverted, startingUnit, endUnit;

  if ((numToBeConverted = inputNumber.value) === '')
  {
    ErrorNoMeasureToConvert();
    return;
  }

  if ((startingUnit = sourceUnit.value) === '')
  {
    ErrorNoSourceUnitSelected();
    return;
  }

  if ((endUnit = targetUnit.value) === '')
  {
    ErrorNoTargetUnitSelected();
    return;
  }

  const result = startingUnit === endUnit
    ? numToBeConverted
    : numToBeConverted * conversionSheet[startingUnit][endUnit];

  outputText.textContent = (Math.round(result*100) / 100).toFixed(2);
});

inputNumber.addEventListener('keydown', (e) => {
  if (e.key === "Enter") submitBtn.click();
})