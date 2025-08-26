import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>();
        String inputFile = "numbers.txt";
        String outputFile = "sorted_numbers.txt";

        
        try (BufferedReader br = new BufferedReader(new FileReader(inputFile))) {
            String line;
            while ((line = br.readLine()) != null) {
                numbers.add(Integer.parseInt(line.trim()));
            }
        } catch (IOException e) {
            System.err.println("Erro ao ler o arquivo: " + e.getMessage());
            return;
        }

        
        int[] arr = numbers.stream().mapToInt(i -> i).toArray();

        
        MergeSort.sort(arr);

        
        try (FileWriter fw = new FileWriter(outputFile)) {
            for (int number : arr) {
                fw.write(number + "\n");
            }
        } catch (IOException e) {
            System.err.println("Erro ao escrever no arquivo: " + e.getMessage());
        }

        System.out.println("Números ordenados e salvos em " + outputFile);
    }
}