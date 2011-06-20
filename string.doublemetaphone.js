//DoubleMetaphone extends the String class.
//Usage:
// "Test".doubleMetaphone();

(function(){
	var in_array = function(arr,p_val){
		for(var i = 0, l = arr.length; i < l; i++){
			if(arr[i] == p_val)
				return true;
		}
		return false;
	},
	slavo_germanic = function(string){
		return /W|K|CZ|WITZ/.test(string);
	},
	vowel = function(character) {
		return /^[AEIOUY]$/.test(character);
	};

	String.prototype.doubleMetaphone = function(){
		var primary = new Array, secondary = new Array, current = 0;
		var original = this.toUpperCase()+'     ', length = this.length, last = length -1;
		if(/^GN|KN|PN|WR|PS$/.test(original.substr(0,2)))
      current += 1;
    if('X' == original.substr(0, 1)){
			primary.push('S');
			secondary.push('S');
			current += 1;
		}
		//main loop
		var resultset = new Array;
		while ((primary.length<4 || secondary.length<4) && current <= length){
			resultset = double_metaphone_lookup(original, current, length, last);
			if(resultset[0]) primary.push(resultset[0]);
			if(resultset[1]) secondary.push(resultset[1]);
			current += resultset[2];
		}
		primary = primary.join('').substr(0,4);
		secondary = secondary.join('').substr(0,4);
		return [primary, (primary == secondary)? null : secondary];
	};

	var A='A',B='B',C='C',D='D',E='E',F='F',G='G',H='H',I='I',J='J',K='K',L='L',M='M',N='N',O='O',P='P',Q='Q',R='R',S='S',T='T',U='U',V='V',W='W',X='X',Y='Y',Z='Z';
	function double_metaphone_lookup(str, pos, length, last){
		var cl = str.charAt(pos); // current letter
		switch (true){
			case vowel(cl):
				return (pos) ? [null, null, 1] : [A,A,1];
			case cl==B:
				return [P,P,(B == str.charAt(pos+1))?2:1];
			case cl=='Ç':
				return [S,S,1];
			case cl==C:
				if(pos>1 && !vowel(str.charAt(pos-2)) && 'ACH' == str.substr(pos-1,3) && str.charAt(pos+2) != I && (str.charAt(pos+2) != E || /^(B|M)ACHER$/.test(str.substr(pos-2,6))))
					return [K,K,2];
				else if(!pos && 'CAESAR' == str.substr(pos,6))
					return [S,S,2];
				else if('CHIA' == str.substr(pos, 4))
					return [K,K,2];
				else if('CH' == str.substr(pos,2)){
					if(pos && 'CHAE' == str.substr(pos,4))
						return [K,X,2];
					else if(!pos && (in_array(['HARAC', 'HARIS'],str.substr(pos+1,5)) || in_array(['HOR', 'HYM', 'HIA', 'HEM'],str.substr(pos+1,3))) && str.substr(0,5) != 'CHORE')
						return [K,K,2];
					else if(in_array(['VON','VAN'],str.substr(0,4)) || 'SCH' == str.substr(0,3) || in_array(['ORCHES','ARCHIT','ORCHID'],str.substr(pos-2,6)) || /^T|S$/.test(str.charAt(pos+2)) || ((!pos || /^[AOUE]$/.test(str.charAt(pos-1))) && /^[LRNMBHFVW ]$/.test(str.charAt(pos+2))))
						return [K,K,2];
					else if(pos)
						return [('MC' == str.substr(0,2))?K:X,K,2];
					else return [X,X,2];
				}
				else if(Z == str.charAt(pos+1) && 'WI' != str.substr(pos-2,2))
					return [S,X,2];
				else if('CIA' == str.substr(pos+1,3))
					return [X,X,3];
				else if(C == str.charAt(pos+1) && 1 != pos && M != str.charAt(0)){
					if(/^[IEH]$/.test(str.charAt(pos+2)) && 'HU' != str.substr(pos+2,2)){
						if ((1 == pos && A == str.charAt(pos-1)) || /^UCCE(E|S)$/.test(str.substr(pos-1,5)))
							return ['KS','KS',3];
						else
							return [X,X,3];
					}
					else
						return [K,K,2];
				}
				else if(/^[KGQ]$/.test(str.charAt(pos+1)))
					return [K,K,2];
				else if(/^[IEY]$/.test(str.charAt(pos+1)))
					return [S,(/^I(O|E|A)$/.test(str.substr(pos+1, 2)) ? X : S), 2];
				else{
					if(/^ (C|Q|G)$/.test(str.substr(pos+1,2)))
						return [K,K,3];
					else
						return [K,K,(/^[CKQ]$/.test(str.charAt(pos+1)) && !(in_array(['CE','CI'],str.substr(pos+1,2))))? 2: 1];
				}
			case cl==D:
				if(str.charAt(pos+1)==G){
					if(/^[IEY]$/.test(str.charAt(pos+2)))
						return [J,J,3];
					else
						return ['TK','TK',2];
				}
				else
					return [T,T,(/^[DT]$/.test(str.charAt(pos+1)))? 2:1];
			case cl==F:
				return [F,F,(F==str.charAt(pos+1))?2:1];
			case cl==G:
				if(H==str.charAt(pos+1)){
					if(pos && !vowel(str.charAt(pos-1)))
						return [K,K,2];
					else if(!pos){
						if(I == str.charAt(pos+2))
							return [J,J,2];
						else
							return [K,K,2];
					}
					else if((pos>1 && /^[BHD]$/.test(str.charAt(pos-2))) || (pos>2 && /^[BHD]$/.test(str.charAt(pos-3))) || (pos>3 && /^B|H$/.test(str.charAt(pos-4))))
						return [null,null,2];
					else{
						if(pos>2 && U == str.charAt(pos-1) && /^[CGLRT]$/.test(str.charAt(pos-3)))
							return [F,F,2];
						else{
							if(pos && I != str.charAt(pos-1))
								return [K,K,2];
							else
								return [null,null,2];
						}
					}
				}
				else if(N==str.charAt(pos+1)){
					if(1==pos && vowel(str.charAt(0)) && !slavo_germanic(str))
						return ['KN',N,2];
					else{
						if('EY' != str.substr(pos+2,2) && Y != str.charAt(pos+1) && !slavo_germanic(str))
							return [N,'KN',2];
						else
							return ['KN','KN',2];
					}
				}
				else if('LI'==str.substr(pos+1,2))
					return ['KL',L,2];
				else if(!pos && (Y==str.charAt(pos+1) || /^(E(S|P|B|L|Y|I|R)|I(B|L|N|E))$/.test(str.substr(pos+1,2))))
					return [K,J,2];
				else if(('ER' == str.substr(pos+1,2) || Y == str.charAt(pos+1)) && !/^(D|R|M)ANGER$/.test(str.substr(0,6)) && !/^E|I$/.test(str.charAt(pos-1)) && !/^(R|O)GY$/.test(str.substr(pos-1,3)))
					return [K,J,2];
				else if(/^[EIY]$/.test(str.charAt(pos+1)) || /^(A|O)GGI$/.test(str.substr(pos-1,4))){
					if(/^V(A|O)N $/.test(str.substr(0,4)) || 'SCH' == str.substr(0,3) || 'ET' == str.substr(pos+1,2))
						return [K,K,2];
					else{
						if ('IER ' == str.substr(pos+1,4))
							return [J,J,2];
						else
							return [J,K,2];
					}
				}
				else if(G==str.charAt(pos+1))
					return [K,K,2];
				else
					return [K,K,1];
			case cl==H:
				if(!pos || vowel(str.charAt(pos-1)) && vowel(str.charAt(pos+1)))
					return [H,H,2];
				else
					return [null,null,1];
			case cl==J:
				if ('OSE' == str.substr(pos+1,3) || 'SAN ' == str.substr(0,4)){
					if((!pos && ' ' == str.charAt(pos+4)) || 'SAN ' == str.substr(0,4))
						return [H,H,1];
					else
						return [J,H,1];
				}
				else{
					var current = (J==str.charAt(pos+1))? 2 : 1;
					if(!pos && 'OSE' != str.substr(pos+1,3))
						return [J,A,current];
					else{
						if (vowel(str.charAt(pos-1)) && !slavo_germanic(str) && /^A|O$/.test(str.charAt(pos+1)))
							return [J,H,current];
						else{
							if(last == pos)
								return [J,null, current];
							else{
								if (!/^[LTKSNMBZ]$/.test(str.charAt(pos+1)) && !/^[SKL]$/.test(str.charAt(pos-1)))
									return [J,J,current];
								else
									return [null,null,current];
							}
						}
					}
				}
			case cl==K:
				return [K,K,(K==str.charAt(pos+1))? 2 : 1];
			case cl==L:
				if(L==str.charAt(pos+1)){
					if(((length-3)==pos && /^(ILL(O|A)|ALLE)$/.test(str.substr(pos-1,4))) || (/^(A|O)S$/.test(str.substr(last-1,2)) || /^A|O$/.test(str.charAt(last)) && 'ALLE'== str.substr(pos-1,4)))
						return [L,null,2];
					else
						return [L,L,2];
				}
				else
					return [L,L,1];
			case cl==M:
				if(('UMB' == str.substr(pos-1,3) && (last-1 == pos || 'ER' == str.substr(pos+2,2))) || M == str.charAt(pos+1))
					return [M,M,2];
				else
					return [M,M,1];
			case cl==N:
				return [N,N,(N==str.charAt(pos+1))? 2: 1];
			case cl=='Ñ':
				return [N,N,1];
			case cl==P:
				if(H==str.charAt(pos+1))
					return [F,F,2];
				else
					return [P,P,(/^P|B$/.test(str.charAt(pos+1)))? 2 : 1];
			case cl==Q:
				return [K,K,(Q==str.charAt(+1))? 2: 1];
			case cl==R:
				var current =(R==str.charAt(pos+1))? 2 : 1;
				if(last == pos && !slavo_germanic(str) && 'IE' == str.substr(pos-2,2) && !/^M(E|A)$/.test(str.substr(pos-4,2)))
					return [null,R,current];
				else
					return [R,R,current];
			case cl==S:
				if(/^(I|Y)SL$/.test(str.substr(pos-1,3)))
					return [null,null,1];
        else if(0 == pos && 'SUGAR' == str.substr(0,5))
          return [X, S, 1];
				else if (H==str.charAt(pos+1)){
					if (/^H(EIM|OEK|OLM|OLZ)$/.test(str.substr(pos+1,4)))
						return [S,S,2];
					else
						return [X,X,2];
				}
				else if (/^I(O|A)$/.test(str.substr(pos+1,2)))
					return [S,(slavo_germanic(str))? S : X, 3];
				else if ((!pos && /^[MNLW]$/.test(str.charAt(+1))) || Z==str.charAt(pos+1))
					return [S,X,(Z==str.charAt(pos+1))? 2 : 1];
				else if (C== str.charAt(pos+1)){
					if (H== str.charAt(pos+2)){
						if (/^OO|ER|EN|UY|ED|EM$/.test(str.substr(pos+3,2)))
							return [(/^E(R|N)$/.test(str.substr(pos+3,2)))? X : 'SK','SK',3];
						else
							return [X,((!pos && !vowel(str.charAt(3))) && (W != str.charAt(pos+3)))? S : X,3];
					}
					else if (/^[IEY]$/.test(str.charAt(pos+2)))
						return [S,S,3];
					else
						return ['SK','SK',3];
				}
				else
					return [(last == pos && /^(A|O)I$/.test(str.substr(pos-2,2)))? null : S,S,(/^S|Z$/.test(str.charAt(pos+1)))? 2 : 1];
			case cl==T:
				if ('ION' == str.substr(pos+1,3) || /^IA|CH$/.test(str.substr(pos+1,2)))
					return [X,X,3];
				else if(H==str.charAt(pos+1) || 'TH' == str.substr(pos+1,2)){
					if(/^(O|A)M$/.test(str.substr(pos+2,2)) || /^V(A|O)N $/.test(str.substr(0,4)) || 'SCH'== str.substr(0,3))
						return [T,T,2];
					else
						return['0',T,2];
				}
				else return [T,T,(/^T|D$/.test(str.charAt(pos+1)))? 2 : 1];
			case cl==V:
				return [F,F,(V==str.charAt(pos+1))? 2 : 1];
			case cl==W:
				if(R==str.charAt(pos+1))
					return [R,R,2];
				var pri = '';
				var sec = '';
				if(!pos && vowel(str.charAt(pos+1)) || H==str.charAt(pos+1)){
					pri = A;
					sec = (vowel(str.charAt(pos+1)))? F : A;
				}
				if(last == pos && vowel(str.charAt(pos-1)) || 'SCH' == str.substr(0,3) || /^EWSKI|EWSKY|OWSKI|OWSKY$/.test(str.substr(pos-1,5)))
					return [pri,sec+F,1];
				else if(/^I(C|T)Z$/.test(str.substr(pos+1,3)))
					return [pri+'TS',sec+'FX',4];
				else
					return [pri,sec,1];
			case cl==X:
				var current = (/^C|X$/.test(str.charAt(pos+1)))? 2 : 1;
				if (last == pos && (/^(I|E)AU$/.test(str.substr(pos-3,3)) || /^(A|O)U$/.test(str.substr(pos-2, 2))))
					return [null,null, current];
				else
					return ['KS','KS',current];
			case cl==Z:
				if(H==str.charAt(pos+1))
					return [J,J,2];
				else{
					var current = (Z==str.charAt(pos+1)) ? 2 : 1;
					if(/^Z(O|I|A)$/.test(str.substr(pos+1,2)) || (slavo_germanic(str) && (pos > 0 && T != str.charAt(pos-1))))
						return [S,'TS',current];
					else
						return [S,S,current];
				}
		}
		return [null,null,1];
	};
})();
