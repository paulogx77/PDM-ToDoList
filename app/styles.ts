import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F4F5F7',
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  contador: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  btnNova: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2980B9',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  btnNovaTexto: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  barraPrio: {
    width: 6,
  },
  itemConteudo: {
    flex: 1,
    padding: 10,
    gap: 6,
  },
  itemNome: {
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  badge: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeTexto: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  prazoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#eee',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  prazoExpirado: {
    backgroundColor: '#FADBD8',
  },
  prazoTexto: {
    fontSize: 11,
    color: '#555',
    fontWeight: '500',
  },
  prazoTextoExpirado: {
    color: '#C0392B',
    fontWeight: '700',
  },
  acoes: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  vazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  vazioTexto: {
    fontSize: 16,
    color: '#aaa',
    fontWeight: '500',
  },
  vazioSub: {
    fontSize: 13,
    color: '#ccc',
  },
});

export const modal = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444',
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    color: '#222',
    backgroundColor: '#FAFAFA',
    minHeight: 44,
  },
  inputErro: {
    borderColor: '#C0392B',
  },
  erro: {
    color: '#C0392B',
    fontSize: 12,
    marginTop: 4,
  },
  prioridadeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  prioBtn: {
    width: 44,
    height: 44,
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  prioBtnTexto: {
    fontWeight: '700',
    fontSize: 16,
    color: '#444',
  },
  labelPrio: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
  },
  botoes: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 22,
  },
  btnCancelar: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 13,
    alignItems: 'center',
  },
  btnCancelarTexto: {
    color: '#555',
    fontWeight: '600',
  },
  btnSalvar: {
    flex: 2,
    backgroundColor: '#2980B9',
    borderRadius: 10,
    padding: 13,
    alignItems: 'center',
  },
  btnSalvarTexto: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});