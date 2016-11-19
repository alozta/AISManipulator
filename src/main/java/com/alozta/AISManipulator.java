/**
 * Created by Ozan on 17.10.2016.
 */
package com.alozta;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Map;
import java.util.Scanner;

@SpringBootApplication
@EnableAutoConfiguration
public class AISManipulator {
	WebService ws = new WebService();
	private static MongoClient mongo = new MongoClient("localhost", 27017);
	private static MongoDatabase db = mongo.getDatabase("bitirme");
	private static MongoCollection collection = db.getCollection("ais");

	public static void main(String [] args){
		String path = "C:\\Users\\Ozan\\Desktop\\Bitirme\\AIS_data\\20161117.csv";       //input file path

		//addAISInCSVFormatToDB(path);                      //ADD NEW ENTRIES

		//System.out.println(getVesselInfo("616715000","2015-10-10 00:00:00.0","2017-10-10 00:00:00.0"));
		//System.out.println(getAllDistinctMMSIs().size());                     //how many unique vessels are in the db

		/*for(Document d : getAllDistinctMMSIs()){
			System.out.println(d.get("_id"));
			//for(Map.Entry e : d.entrySet()){
				//System.out.println(e.getKey()+":"+e.getValue());
			//}
		}*/
		/*Document d = db.runCommand(new Document("$eval", "db.ais.distinct('mmsi').length"));
		System.out.println(d);*/                            //output: Document{{retval=3588.0, ok=1.0}}, distinct vessel count

		SpringApplication.run(WebService.class, args);
	}

	/**
	 * @return All distinct MMSI's from db.
	 * */
	public static ArrayList<Document> getAllDistinctMMSIs(){
		Document d = db.runCommand(new Document("$eval", "getAllDistinctMMSIs()"));
		d = (Document) d.get("retval");
		return (ArrayList<Document>) d.get("_batch");
	}

	/**
	 * Get information about vessel's movements in certain amount of time.
	 * Successor for mongodb getVesselInfo function.
	 *
	 * @param mmsi ID for the vessel
	 * @param startDate Starting limit for date in ISODate format
	 * @param endDate Ending limit for date in ISODate format
	 * @return Aggregated mongodb result for getVesselInfo function as ArrayList
	 *
	 * Usage: <getVesselInfo("616715000","2015-10-10 00:00:00.0","2017-10-10 00:00:00.0")>
	 * */
	public static ArrayList<Document> getVesselInfo(String mmsi, String startDate, String endDate){
		Document d = db.runCommand(new Document("$eval", "getVesselInfo(\""+mmsi+"\",\""+startDate+"\",\""+endDate+"\")"));
		d = (Document) d.get("retval");
		return (ArrayList<Document>) d.get("_batch");
	}

	/**
	 * Read csv based file and save each row as an entry to mongodb database.
	 *
	 * @param filePath Input file path
	 * */
	public static void addAISInCSVFormatToDB(String filePath){
		Scanner lineReader = null;
		int i=0;
		try {
			lineReader = new Scanner(new File(filePath));
			while (lineReader.hasNext())
			{
				String [] params = lineReader.nextLine().split(";");

				collection.insertOne(new Document().append("mmsi",params[2]).append("date",params[1]).append("lat",params[3]).append("lon",params[4]));
				if(i++%1000==0){
					System.out.println(i);
				}
			}
			lineReader.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}
}
