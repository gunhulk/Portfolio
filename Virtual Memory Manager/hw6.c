#include <stdlib.h>
#include <stdio.h>

const int NUMBER_OF_FRAMES = 256;
const int NUMBER_OF_PAGES = 256;
const int PAGE_SIZE = 256;
int pTable[256];
char phyMemory[256][256];
char TLB[256][256];
FILE *address_file;
FILE *backing_store;
int main(int argc, char *argv[])
{
    int i;
    const int MASK_OFFSET = 0xff;
    const int MASK_PAGE = 0xff00;
	
    backing_store = fopen(argv[1],"rb");
    address_file =fopen(argv[2],"r"); 
    int offset;
    int page;
    int BUFFER_SIZE = 10;
    int logical_address;
    int value;
    int frame;
    int tlbEntries = 16;
    int count = 0;
    char address[BUFFER_SIZE]; 
    for(int i = 0; i < NUMBER_OF_PAGES; i++){
	pTable[i] = -1;
}

while(fgets(address, BUFFER_SIZE, address_file) != NULL){
    logical_address = atoi(address);

     // AND number with MASK
     offset = logical_address & MASK_OFFSET;

     /**
     *
     * an example:

     number = 295 = 100100111 in binary
     MASK = 15 =         1111
     -------------------------
     num & mask          0111
     */

     //printf("#%d = %d\n",i,logical_address);
     //printf("offset = %d\n", offset);

     // shift the number 8 bit-positions to the right

     page = logical_address & MASK_PAGE;
     page = page >> 8;


     // number >> 4 = 100100111 -> 000010010
     //printf("page = %d\n",page);
     if(TLB[page][frame] != -1){
	frame = TLB[page][frame];
}

     if(pTable[page] != -1){
	frame = pTable[page];
     }
     else{

	if(fseek(backing_store, page * PAGE_SIZE, SEEK_SET) != 0){
		fprintf(stderr, "Error seeking in backing store\n");
		return -1;
        }
	if(fread(&phyMemory[count], sizeof(signed char), NUMBER_OF_FRAMES, backing_store) == 0){
		fprintf(stderr, "Error reading from\n");
		return -1;
        }

	pTable[page] = count;
        TLB[page][frame] = count;
	frame = pTable[page];
	count++;
    } 
    value = phyMemory[frame][offset];
    //printf("%d \t %d\n", logical_address, value);
    printf("%d\n", value);

  }
    return 0;
}
