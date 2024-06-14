import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text,
         TextInput, View, Button,ScrollView} from 'react-native';
import {supabase} from './conexao'


export default function App() {
  const [produtoDigitado, setProdutoDigitado] = useState("");
  const [valorDigitado, setValorDigitado] = useState("");
  const [quantidadeDigitada, setQuantidadeDigitada] = useState("");
  const [dados, setDados] = useState([]);

  //Função para consultar as compras
  const consultarCompras = async() => {
      const {data, error} = await supabase.from("tb_lista_compras")
      .select("*")
      if(error){ alert("Falha ao consultar! "+error.message)}
      else{
        setDados(data)
      }
  }
  useEffect(()=>{
    consultarCompras()
  },[])

  //Função para cadastrar produto
  async function cadastrarProduto() {
  const { error } = await supabase.from("tb_lista_compras")
    .insert({
      coluna_produto: produtoDigitado,
      coluna_valor: valorDigitado,
      coluna_quantidade: quantidadeDigitada
    });
  if (error) {
    alert("Falha ao cadastrar!" + error.message);
  } else {
    alert("Cadastrado com sucesso!");
    consultarCompras();
  }
}

  return (
    <View style={estilos.container}>
      <Text style={{fontSize: 20}}>Cadastro de Produtos</Text>
      <TextInput
          onChangeText={(texto)=>setProdutoDigitado(texto)}
          placeholder='Digite o produto'
          style={estilos.caixaTexto} />
      <TextInput
          onChangeText={(texto)=>setValorDigitado(texto)}
          placeholder='Digite o valor'
          style={estilos.caixaTexto} />
      <TextInput
          onChangeText={(texto)=>setQuantidadeDigitada(texto)}
          placeholder='Digite a quantidade'
          style={estilos.caixaTexto} />
      <Button
      title="Cadastrar"
      onPress={()=>cadastrarProduto()} />

      <ScrollView>
        {dados.map((item)=>(
            <View style={estilos.cxProdutos}>
                <Text> PRODUTO: {item.coluna_produto}   </Text>
                <Text> VALOR: {item.coluna_valor} </Text>
                <Text> QUANTIDADE: {item.coluna_quantidade}       </Text>
            </View>
         )      
        )}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}
const estilos = StyleSheet.create({
  cxProdutos:{
    borderWidth: 1,
    borderRadius: 8,
    minWidth: 300,
    padding: 10
  },
  caixaTexto:{
    borderWidth: 1,
    borderColor: "#c5c5c56",
    padding: 4,
    borderRadius: 4,
    marginBottom: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});