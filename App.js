import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const green = '#A6FF00';
const bg = '#050807';
const card = '#101715';
const border = '#1F2B27';

const categories = [
  { name: 'Jedzenie', amount: 650, pct: 71, icon: 'fast-food-outline' },
  { name: 'Transport', amount: 400, pct: 67, icon: 'car-outline' },
  { name: 'Rozrywka', amount: 250, pct: 70, icon: 'game-controller-outline' },
  { name: 'Zakupy', amount: 420, pct: 55, icon: 'bag-outline' },
];

const subs = [
  { name: 'Netflix', price: '29,00 zł', icon: 'play-circle-outline' },
  { name: 'Spotify', price: '19,99 zł', icon: 'musical-notes-outline' },
  { name: 'Canva Pro', price: '49,99 zł', icon: 'color-palette-outline' },
];

function Header() {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.hello}>Cześć, Kasia 👋</Text>
        <Text style={styles.muted}>Twoje finanse pod kontrolą</Text>
      </View>
      <View style={styles.avatar}><Text style={styles.logo}>K</Text></View>
    </View>
  );
}

function Progress({ value }) {
  return <View style={styles.progress}><View style={[styles.progressFill, { width: `${value}%` }]} /></View>;
}

function Welcome({ onStart }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.welcome}>
        <Text style={styles.bigLogo}>K</Text>
        <Text style={styles.title}>KASHLY</Text>
        <Text style={styles.subtitle}>Smarter Money Starts Here</Text>
        <Text style={styles.description}>Analizuj wydatki, twórz budżety, kontroluj subskrypcje i oszczędzaj z pomocą AI.</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={onStart}>
          <Text style={styles.primaryButtonText}>Zacznij teraz</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function Dashboard() {
  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      <Header />
      <View style={styles.balanceCard}>
        <Text style={styles.muted}>Dostępne środki</Text>
        <Text style={styles.balance}>12 540,50 zł</Text>
        <Text style={styles.positive}>+ 1 250 zł w porównaniu do poprzedniego miesiąca</Text>
      </View>
      <View style={styles.grid}>
        <SmallCard icon="analytics-outline" title="AI Insight" value="420 zł" />
        <SmallCard icon="wallet-outline" title="Budżety" value="4 aktywne" />
        <SmallCard icon="notifications-outline" title="Alerty" value="2 nowe" />
        <SmallCard icon="shield-checkmark-outline" title="Bezpieczeństwo" value="OK" />
      </View>
      <SectionTitle title="Podsumowanie miesiąca" />
      <View style={styles.card}>
        <Text style={styles.amount}>Wydatki: 3 650 zł</Text>
        <Text style={styles.muted}>Największy wydatek: wakacje 2024 — 1 250 zł</Text>
        <View style={styles.fakeChart}><View style={styles.chartBar1}/><View style={styles.chartBar2}/><View style={styles.chartBar3}/><View style={styles.chartBar4}/></View>
      </View>
    </ScrollView>
  );
}

function SmallCard({ icon, title, value }) {
  return <View style={styles.smallCard}><Ionicons name={icon} size={24} color={green}/><Text style={styles.smallTitle}>{title}</Text><Text style={styles.smallValue}>{value}</Text></View>;
}

function SectionTitle({ title }) { return <Text style={styles.sectionTitle}>{title}</Text>; }

function AI() {
  return <ScrollView style={styles.screen}><Header /><SectionTitle title="Inteligentna analiza AI" /><View style={styles.cardCenter}><Ionicons name="happy-outline" size={68} color={green}/><Text style={styles.amount}>Możesz zaoszczędzić 420 zł w tym miesiącu</Text><Text style={styles.mutedCenter}>AI wykryło większe wydatki na jedzenie i subskrypcje. Ogranicz je o 15%, aby szybciej osiągnąć cel.</Text></View><Insight text="Zrezygnuj z jednej nieużywanej subskrypcji."/><Insight text="Ustaw limit 600 zł na jedzenie poza domem."/><Insight text="Przenieś 300 zł automatycznie na oszczędności."/></ScrollView>;
}
function Insight({text}) { return <View style={styles.rowCard}><Ionicons name="sparkles-outline" color={green} size={22}/><Text style={styles.rowText}>{text}</Text></View>; }

function Budgets() {
  return <ScrollView style={styles.screen}><Header /><SectionTitle title="Budżety" />{categories.map((c) => <View style={styles.card} key={c.name}><View style={styles.rowBetween}><View style={styles.row}><Ionicons name={c.icon} color={green} size={22}/><Text style={styles.amountSmall}>{c.name}</Text></View><Text style={styles.muted}>{c.pct}%</Text></View><Text style={styles.muted}>{c.amount} zł wykorzystane</Text><Progress value={c.pct}/></View>)}<TouchableOpacity style={styles.secondaryButton}><Text style={styles.secondaryText}>+ Dodaj budżet</Text></TouchableOpacity></ScrollView>;
}

function Goals() {
  return <ScrollView style={styles.screen}><Header /><SectionTitle title="Cele oszczędnościowe" /><Goal name="Wakacje 2024" saved="4 250 zł" target="8 000 zł" pct={53}/><Goal name="Nowy laptop" saved="2 150 zł" target="5 000 zł" pct={43}/><Goal name="Poduszka finansowa" saved="3 000 zł" target="10 000 zł" pct={30}/></ScrollView>;
}
function Goal({name,saved,target,pct}) { return <View style={styles.card}><View style={styles.rowBetween}><Text style={styles.amountSmall}>{name}</Text><Text style={styles.positive}>{pct}%</Text></View><Text style={styles.muted}>{saved} z {target}</Text><Progress value={pct}/></View>; }

function More() {
  return <ScrollView style={styles.screen}><Header /><SectionTitle title="Subskrypcje" />{subs.map(s => <View style={styles.rowCard} key={s.name}><Ionicons name={s.icon} color={green} size={24}/><View style={{flex:1}}><Text style={styles.rowText}>{s.name}</Text><Text style={styles.muted}>{s.price} miesięcznie</Text></View></View>)}<SectionTitle title="Bezpieczeństwo" /><View style={styles.card}><Text style={styles.check}>✓ Szyfrowanie danych aplikacji</Text><Text style={styles.check}>✓ Dwustopniowa weryfikacja</Text><Text style={styles.check}>✓ Kod PIN i Face ID</Text></View><SectionTitle title="Statystyki" /><View style={styles.card}><Text style={styles.amount}>Wydatki: 3 650 zł</Text><View style={styles.lineChart}><Text style={styles.chartLine}>▁▂▃▂▅▆█</Text></View></View></ScrollView>;
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [tab, setTab] = useState('home');
  if (!started) return <Welcome onStart={() => setStarted(true)} />;
  const Screen = tab === 'home' ? Dashboard : tab === 'ai' ? AI : tab === 'budgets' ? Budgets : tab === 'goals' ? Goals : More;
  return <SafeAreaView style={styles.safe}><StatusBar style="light" /><Screen /><View style={styles.nav}>{[
    ['home','home-outline','Home'],['ai','sparkles-outline','AI'],['budgets','wallet-outline','Budżety'],['goals','flag-outline','Cele'],['more','grid-outline','Więcej']
  ].map(item => <TouchableOpacity key={item[0]} style={styles.navItem} onPress={() => setTab(item[0])}><Ionicons name={item[1]} size={22} color={tab===item[0]?green:'#6F7772'}/><Text style={[styles.navText, tab===item[0] && {color:green}]}>{item[2]}</Text></TouchableOpacity>)}</View></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:bg}, screen:{flex:1,padding:18,backgroundColor:bg}, welcome:{flex:1,justifyContent:'center',alignItems:'center',padding:28,backgroundColor:bg}, bigLogo:{fontSize:96,fontWeight:'900',color:green}, title:{fontSize:42,fontWeight:'900',color:'#fff',letterSpacing:2}, subtitle:{fontSize:16,color:green,fontWeight:'700',marginTop:4}, description:{color:'#B9C3BD',textAlign:'center',marginTop:24,lineHeight:22}, primaryButton:{backgroundColor:green,borderRadius:16,paddingVertical:16,paddingHorizontal:44,marginTop:34}, primaryButtonText:{color:'#071008',fontWeight:'900',fontSize:16}, header:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:18}, hello:{color:'#fff',fontSize:24,fontWeight:'800'}, muted:{color:'#87918C',fontSize:13,marginTop:4}, mutedCenter:{color:'#A7B0AB',fontSize:14,marginTop:10,textAlign:'center',lineHeight:20}, avatar:{width:46,height:46,borderRadius:23,backgroundColor:'#172017',borderWidth:1,borderColor:green,alignItems:'center',justifyContent:'center'}, logo:{color:green,fontSize:28,fontWeight:'900'}, balanceCard:{backgroundColor:'#0B1512',borderColor:border,borderWidth:1,borderRadius:24,padding:22,marginBottom:14}, balance:{color:'#fff',fontSize:36,fontWeight:'900',marginTop:8}, positive:{color:green,fontSize:12,marginTop:8}, grid:{flexDirection:'row',flexWrap:'wrap',gap:12}, smallCard:{width:'48%',backgroundColor:card,borderColor:border,borderWidth:1,borderRadius:18,padding:15}, smallTitle:{color:'#BFC8C2',marginTop:10}, smallValue:{color:'#fff',fontWeight:'800',marginTop:4}, sectionTitle:{color:'#fff',fontSize:22,fontWeight:'900',marginTop:24,marginBottom:12}, card:{backgroundColor:card,borderColor:border,borderWidth:1,borderRadius:20,padding:18,marginBottom:12}, cardCenter:{backgroundColor:card,borderColor:border,borderWidth:1,borderRadius:24,padding:24,alignItems:'center',marginBottom:14}, amount:{color:'#fff',fontSize:22,fontWeight:'900'}, amountSmall:{color:'#fff',fontSize:16,fontWeight:'800',marginLeft:8}, fakeChart:{height:92,flexDirection:'row',alignItems:'flex-end',gap:12,marginTop:18}, chartBar1:{height:35,width:34,backgroundColor:green,borderRadius:8}, chartBar2:{height:62,width:34,backgroundColor:green,borderRadius:8}, chartBar3:{height:48,width:34,backgroundColor:green,borderRadius:8}, chartBar4:{height:82,width:34,backgroundColor:green,borderRadius:8}, rowCard:{flexDirection:'row',alignItems:'center',gap:12,backgroundColor:card,borderColor:border,borderWidth:1,borderRadius:18,padding:16,marginBottom:10}, rowText:{color:'#fff',fontWeight:'700',fontSize:15}, rowBetween:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}, row:{flexDirection:'row',alignItems:'center'}, progress:{height:8,backgroundColor:'#25312D',borderRadius:6,overflow:'hidden',marginTop:12}, progressFill:{height:'100%',backgroundColor:green,borderRadius:6}, secondaryButton:{borderColor:green,borderWidth:1,borderRadius:16,padding:15,alignItems:'center',marginBottom:24}, secondaryText:{color:green,fontWeight:'800'}, check:{color:'#DDE7E1',fontSize:15,marginBottom:8}, lineChart:{height:90,justifyContent:'center',alignItems:'center'}, chartLine:{color:green,fontSize:52,letterSpacing:4}, nav:{height:76,backgroundColor:'#080D0B',borderTopWidth:1,borderTopColor:border,flexDirection:'row',alignItems:'center',justifyContent:'space-around'}, navItem:{alignItems:'center',justifyContent:'center'}, navText:{color:'#6F7772',fontSize:11,marginTop:4,fontWeight:'700'}
});
