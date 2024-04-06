import * as React from "react";
import Button from "./Button";
import { View, Text } from "react-native";
import { Styles } from "../styles/GlobalStyles";
import { myColors } from "../styles/Colors";
import { withBadge } from "react-native-elements";

export default function myKeyboard() {
    const [firstNumber, setFirstNumber] = React.useState("");
    const [secondNumber, setSecondNumer] = React.useState("");
    const [operation, setOperation] = React.useState("");
    const [result, setResult] = React.useState<number | null>(null);
    
    const handleDeletePress = () => {
    if (result === null) {
        if (firstNumber.length > 0) {
            setFirstNumber(firstNumber.slice(0, -1));
        }
    } else {
        setResult(parseInt(result.toString().slice(0, -1)) || null);
    }
};

    


const handleNumberPress = (buttonValue: string) => {
    if (firstNumber === "-0") {
        setFirstNumber("-" + buttonValue);
    } else if (firstNumber.length < 9) {
        setFirstNumber(firstNumber + buttonValue);
    }
};


    const handleOperationPress = (buttonValue: string) => {
        if (buttonValue === "+/-") {
            if (firstNumber !== "" && firstNumber !== "-0") {
                setFirstNumber((parseFloat(firstNumber) * -1).toString());
            } else if (firstNumber === "-0") {
                setFirstNumber("0");
            } else {
                setFirstNumber("-0");
            }
        } else {
            if (result !== null) {
                setOperation(buttonValue);
                setSecondNumer(result.toString());
                setResult(null);
            } else {
                setOperation(buttonValue);
                setSecondNumer(firstNumber);
                setFirstNumber("");
            }
        }
    };
    
    
    
    const [clearText, setClearText] = React.useState("AC");

    const clear = () => {
        setFirstNumber("");
        setSecondNumer("");
        setOperation("");
        setResult(null);
        setClearText("AC");
    };

    const clearButtonText = result !== null || firstNumber || secondNumber || operation ? "C" : clearText;


    const getResult = () => {
        switch (operation) {
            case "+":
                clear();
                setResult(parseInt(secondNumber) + parseInt(firstNumber));
                break;
            case "-":
                clear();
                setResult(parseInt(secondNumber) - parseInt(firstNumber));
                break;
            case "*":
                clear();
                setResult(parseInt(secondNumber) * parseInt(firstNumber));
                break;
            case "/":
                clear();
                setResult(parseInt(secondNumber) / parseInt(firstNumber));
                break;
            case "%":
                clear();
                setResult(parseInt(secondNumber) * (parseInt(firstNumber) / 100));
                break;
            case "+/-":
                if (firstNumber !== "") {
                    setFirstNumber((parseInt(firstNumber) * -1).toString());
                }
                break;
            default:
                clear();
                setResult(0);
                break;
        }
    };
    

    const firstNumberDisplay = () => {
        let formattedNumber = "";
        let fontSize = Styles.screenFirstNumber.fontSize;
    
        if (result !== null) {
            if (!isFinite(result)) {
                fontSize -= 10; 
            } else {
                const roundedResult = Math.round(result * 100) / 100;
                formattedNumber = roundedResult.toString();
                if (formattedNumber.length > 9) { 
                    formattedNumber = result.toExponential();
                    fontSize -= 10; }

            }
        } else if (firstNumber) {
            formattedNumber = parseFloat(firstNumber).toLocaleString('en-US', { maximumFractionDigits: 2 });
            if (firstNumber.length >= 6) {
                fontSize -= 25;
            }
            if (firstNumber.length >= 8) {
                fontSize -= 20;
            }
        } else {
            formattedNumber = "0";
        }
    
        return (
            <Text style={[Styles.screenFirstNumber, { fontSize: fontSize }, result !== null ? { color: myColors.result } : null]}>
                {formattedNumber}
            </Text>
        );
    };
    
    

    

    return (
        <View style={Styles.viewBottom}>
            <View style={{ height: 120, width: "90%", justifyContent: "flex-end", alignSelf: "center" }}>
                <Text style={Styles.screenSecondNumber}>
                    {secondNumber}
                    <Text style={{ color: "purple", fontSize: 50, fontWeight: '500' }}>{operation}</Text>
                </Text>
                {firstNumberDisplay()}
            </View>
            <View style={Styles.row}>
            <Button title={clearButtonText} isGray onPress={clear} />
                <Button title="+/-" isGray onPress={() => handleOperationPress("+/-")} />
                <Button title="%" isGray onPress={() => handleOperationPress("%")} />
                <Button title="÷" isBlue onPress={() => handleOperationPress("/")} />
            </View>
            <View style={Styles.row}>
                <Button title="7" onPress={() => handleNumberPress("7")} />
                <Button title="8" onPress={() => handleNumberPress("8")} />
                <Button title="9" onPress={() => handleNumberPress("9")} />
                <Button title="×" isBlue onPress={() => handleOperationPress("*")} />
            </View>
            <View style={Styles.row}>
                <Button title="4" onPress={() => handleNumberPress("4")} />
                <Button title="5" onPress={() => handleNumberPress("5")} />
                <Button title="6" onPress={() => handleNumberPress("6")} />
                <Button title="-" isBlue onPress={() => handleOperationPress("-")} />
            </View>
            <View style={Styles.row}>
                <Button title="1" onPress={() => handleNumberPress("1")} />
                <Button title="2" onPress={() => handleNumberPress("2")} />
                <Button title="3" onPress={() => handleNumberPress("3")} />
                <Button title="+" isBlue onPress={() => handleOperationPress("+")} />
            </View>
            <View style={Styles.row}>
                <Button title="." onPress={() => handleNumberPress(".")} />
                <Button title="0" onPress={() => handleNumberPress("0")} />
                <Button title="⌫" onPress={handleDeletePress} />
                <Button title="=" isBlue onPress={() => getResult()} />
            </View>
        </View>
    );
}
