import { nextId } from '@/util/geral';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useCallback, useState } from "react";
import {
  FlatList,
  Keyboard,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { modal, styles } from './styles';

interface Tarefa {
  id: number;
  nome: string;
  prioridade: number;
  prazo: string;
}

function parseData(str: string): Date | null {
  const partes = str.split('/');
  if (partes.length !== 3) return null;
  const [d, m, a] = partes.map(Number);
  if (!d || !m || !a || a < 1000) return null;
  return new Date(a, m - 1, d);
}

function corPrioridade(p: number): string {
  const cores: Record<number, string> = {
    1: '#C0392B',
    2: '#E67E22',
    3: '#F1C40F',
    4: '#27AE60',
    5: '#2980B9',
  };
  return cores[p] ?? '#888';
}

function labelPrioridade(p: number): string {
  const labels: Record<number, string> = {
    1: 'Urgente',
    2: 'Alta',
    3: 'Média',
    4: 'Baixa',
    5: 'Mínima',
  };
  return labels[p] ?? '—';
}

function prazoExpirado(prazo: string): boolean {
  const data = parseData(prazo);
  if (!data) return false;
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  return data < hoje;
}

function ordenarTarefas(tarefas: Tarefa[]): Tarefa[] {
  return [...tarefas].sort((a, b) => {
    const dataA = parseData(a.prazo);
    const dataB = parseData(b.prazo);
    if (dataA && dataB) {
      if (dataA.getTime() !== dataB.getTime()) return dataA.getTime() - dataB.getTime();
    } else if (dataA) return -1;
    else if (dataB) return 1;
    return a.prioridade - b.prioridade;
  });
}


interface FormModalProps {
  visivel: boolean;
  tarefaEditando: Tarefa | null;
  onFechar: () => void;
  onSalvar: (dados: Omit<Tarefa, 'id'>) => void;
}

function FormModal({ visivel, tarefaEditando, onFechar, onSalvar }: FormModalProps) {
  const [nome, setNome] = useState('');
  const [prioridade, setPrioridade] = useState<number>(3);
  const [prazo, setPrazo] = useState('');
  const [erros, setErros] = useState<{ nome?: string; prazo?: string }>({});

  React.useEffect(() => {
    if (visivel) {
      setNome(tarefaEditando?.nome ?? '');
      setPrioridade(tarefaEditando?.prioridade ?? 3);
      setPrazo(tarefaEditando?.prazo ?? '');
      setErros({});
    }
  }, [visivel, tarefaEditando]);

  function formatarPrazo(texto: string) {
    const numeros = texto.replace(/\D/g, '').slice(0, 8);
    let formatado = numeros;
    if (numeros.length > 4) formatado = `${numeros.slice(0,2)}/${numeros.slice(2,4)}/${numeros.slice(4)}`;
    else if (numeros.length > 2) formatado = `${numeros.slice(0,2)}/${numeros.slice(2)}`;
    setPrazo(formatado);
  }

  function validar(): boolean {
    const novosErros: { nome?: string; prazo?: string } = {};
    if (!nome.trim()) novosErros.nome = 'Informe a descrição da tarefa.';
    if (prazo && !parseData(prazo)) novosErros.prazo = 'Formato inválido. Use DD/MM/AAAA.';
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  function handleSalvar() {
    if (!validar()) return;
    onSalvar({ nome: nome.trim(), prioridade, prazo });
    Keyboard.dismiss();
  }

  return (
    <Modal visible={visivel} animationType="slide" transparent onRequestClose={onFechar}>
      <View style={modal.overlay}>
        <View style={modal.container}>
          <View style={modal.header}>
            <Text style={modal.titulo}>
              {tarefaEditando ? 'Editar Tarefa' : 'Nova Tarefa'}
            </Text>
            <Pressable onPress={onFechar} hitSlop={10}>
              <AntDesign name="close" size={22} color="#555" />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={modal.label}>Descrição *</Text>
            <TextInput
              style={[modal.input, erros.nome ? modal.inputErro : null]}
              placeholder="Ex.: Estudar React Native"
              value={nome}
              onChangeText={setNome}
              multiline
            />
            {erros.nome ? <Text style={modal.erro}>{erros.nome}</Text> : null}

            <Text style={modal.label}>Prioridade</Text>
            <View style={modal.prioridadeRow}>
              {[1, 2, 3, 4, 5].map((p) => (
                <Pressable
                  key={p}
                  style={[
                    modal.prioBtn,
                    { borderColor: corPrioridade(p) },
                    prioridade === p && { backgroundColor: corPrioridade(p) },
                  ]}
                  onPress={() => setPrioridade(p)}
                >
                  <Text style={[modal.prioBtnTexto, prioridade === p && { color: '#fff' }]}>
                    {p}
                  </Text>
                </Pressable>
              ))}
            </View>
            <Text style={[modal.labelPrio, { color: corPrioridade(prioridade) }]}>
              {labelPrioridade(prioridade)}
            </Text>

            <Text style={modal.label}>Prazo (DD/MM/AAAA)</Text>
            <TextInput
              style={[modal.input, erros.prazo ? modal.inputErro : null]}
              placeholder="Ex.: 31/12/2025"
              value={prazo}
              onChangeText={formatarPrazo}
              keyboardType="numeric"
              maxLength={10}
            />
            {erros.prazo ? <Text style={modal.erro}>{erros.prazo}</Text> : null}
          </ScrollView>

          <View style={modal.botoes}>
            <Pressable style={modal.btnCancelar} onPress={onFechar}>
              <Text style={modal.btnCancelarTexto}>Cancelar</Text>
            </Pressable>
            <Pressable style={modal.btnSalvar} onPress={handleSalvar}>
              <Text style={modal.btnSalvarTexto}>Salvar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const RenderItem = React.memo(({
  tarefa,
  removerTarefa,
  editarTarefa,
}: {
  tarefa: Tarefa;
  removerTarefa: (id: number) => void;
  editarTarefa: (tarefa: Tarefa) => void;
}) => {
  const expirado = prazoExpirado(tarefa.prazo);

  return (
    <View style={styles.item}>
      <View style={[styles.barraPrio, { backgroundColor: corPrioridade(tarefa.prioridade) }]} />

      <View style={styles.itemConteudo}>
        <Text style={styles.itemNome} numberOfLines={2}>{tarefa.nome}</Text>

        <View style={styles.itemMeta}>
          <View style={[styles.badge, { backgroundColor: corPrioridade(tarefa.prioridade) }]}>
            <Text style={styles.badgeTexto}>P{tarefa.prioridade} · {labelPrioridade(tarefa.prioridade)}</Text>
          </View>

          {tarefa.prazo ? (
            <View style={[styles.prazoBadge, expirado && styles.prazoExpirado]}>
              <MaterialIcons name="event" size={12} color={expirado ? '#C0392B' : '#555'} />
              <Text style={[styles.prazoTexto, expirado && styles.prazoTextoExpirado]}>
                {tarefa.prazo}
              </Text>
            </View>
          ) : null}
        </View>
      </View>

      <View style={styles.acoes}>
        <Pressable onPress={() => editarTarefa(tarefa)} hitSlop={8}>
          <AntDesign name="edit" size={20} color="#2980B9" />
        </Pressable>
        <Pressable onPress={() => removerTarefa(tarefa.id)} hitSlop={8} style={{ marginTop: 8 }}>
          <FontAwesome name="trash-o" size={20} color="#C0392B" />
        </Pressable>
      </View>
    </View>
  );
});

export default function Index() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState<Tarefa | null>(null);

  function abrirNova() {
    setTarefaEditando(null);
    setModalVisivel(true);
  }

  function abrirEdicao(tarefa: Tarefa) {
    setTarefaEditando(tarefa);
    setModalVisivel(true);
  }

  function fecharModal() {
    setModalVisivel(false);
  }

  const salvarTarefa = useCallback((dados: Omit<Tarefa, 'id'>) => {
    setTarefas(prev => {
      if (tarefaEditando) {
        return prev.map(t => t.id === tarefaEditando.id ? { ...t, ...dados } : t);
      }
      return [...prev, { id: nextId(prev), ...dados }];
    });
    setModalVisivel(false);
  }, [tarefaEditando]);

  const removerTarefa = useCallback((id: number) => {
    setTarefas(prev => prev.filter(t => t.id !== id));
  }, []);

  const tarefasOrdenadas = ordenarTarefas(tarefas);

  const Separator = () => <View style={{ height: 6 }} />;

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.contador}>
          {tarefas.length === 0
            ? 'Nenhuma tarefa'
            : `${tarefas.length} tarefa${tarefas.length > 1 ? 's' : ''}`}
        </Text>
        <TouchableOpacity style={styles.btnNova} onPress={abrirNova} activeOpacity={0.8}>
          <AntDesign name="plus" size={18} color="#fff" />
          <Text style={styles.btnNovaTexto}>Nova Tarefa</Text>
        </TouchableOpacity>
      </View>

      {tarefas.length === 0 ? (
        <View style={styles.vazio}>
          <AntDesign name="inbox" size={56} color="#ccc" />
          <Text style={styles.vazioTexto}>Nenhuma tarefa adicionada ainda.</Text>
          <Text style={styles.vazioSub}>Toque em "Nova Tarefa" para começar.</Text>
        </View>
      ) : (
        <FlatList
          data={tarefasOrdenadas}
          renderItem={({ item }) => (
            <RenderItem
              tarefa={item}
              removerTarefa={removerTarefa}
              editarTarefa={abrirEdicao}
            />
          )}
          ItemSeparatorComponent={Separator}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      <FormModal
        visivel={modalVisivel}
        tarefaEditando={tarefaEditando}
        onFechar={fecharModal}
        onSalvar={salvarTarefa}
      />
    </View>
  );
}