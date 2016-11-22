package com.alozta;

import com.mongodb.MongoCommandException;
import org.bson.Document;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

/**
 * Created by Ozan on 13.11.2016.
 */
@EnableAutoConfiguration
@RestController
public class WebService {

	//ApplicationContext ctx = new AnnotationConfigApplicationContext(MongoConfig.class);
	//MongoOperations mongoOperation = (MongoOperations)ctx.getBean("mongoTemplate");     //interface that allows mongodb operations
	private MongoOperations mongoOperation;

	WebService(){
		mongoOperation = MongoConfig.getMongoTemplate();
	}

	public MongoOperations mongo() {
		return mongoOperation;
	}


	@RestController
	public class RequestController {

		@CrossOrigin
		@RequestMapping("/getvesselids")
		public ArrayList<Document> getDistinctMMSIs() {
			String cmd = "db.ais.distinct('mmsi')";
			Document d = (Document) MongoConfig.getMongoClient().getDatabase("bitirme").runCommand(new Document("$eval", cmd));

			return (ArrayList<Document>) d.get("retval");
		}

		@CrossOrigin
		@RequestMapping("/getvesselinfo")
		public ArrayList<Document> getVesselInfo(@RequestParam(value="mmsi", defaultValue="none") String mmsi,
		                                @RequestParam(value="start", defaultValue="none") String startDate,
		                                @RequestParam(value="end", defaultValue="none") String endDate) {
			//String cmd = "getVesselInfo(\""+mmsi+"\",\""+startDate+"\",\""+endDate+"\")";
			String cmd = "db.ais.find({" +
										"mmsi:\""+mmsi+"\"," +
										"date:{$gte:\""+startDate+"\",$lte:\""+endDate+"\"}" +
									 "}).toArray()";
			try {
				Document d = (Document) MongoConfig.getMongoClient().getDatabase("bitirme").runCommand(new Document("$eval", cmd));
				return (ArrayList<Document>) d.get("retval");
			}catch (MongoCommandException e){
				e.printStackTrace();
			}

			return (ArrayList<Document>) new Document().get("retval");
		}

		@CrossOrigin
		@RequestMapping("/isInsideOfCircle")
		public Document isInsideOfCircle(@RequestParam(value="lat", defaultValue="none") String lat,
		                                            @RequestParam(value="lon", defaultValue="none") String lon,
		                                            @RequestParam(value="r", defaultValue="none") String r,
		                                            @RequestParam(value="mmsi", defaultValue="none") String mmsi) {
			String cmd = "isInsideOfCircle(\""+lat+"\",\""+lon+"\",\""+r+"\",\""+mmsi+"\")";
			Document d = (Document) MongoConfig.getMongoClient().getDatabase("bitirme").runCommand(new Document("$eval", cmd));

			return d;
		}

		@CrossOrigin
		@RequestMapping("/getVesselsInCircleRange")
		public Document getVesselsInCircleRange(@RequestParam(value="lat", defaultValue="none") String lat,
		                                                         @RequestParam(value="lon", defaultValue="none") String lon,
		                                                         @RequestParam(value="r", defaultValue="none") String r) {
			String cmd = "getVesselsInCircleRange(\""+lat+"\",\""+lon+"\",\""+r+"\")";
			Document d = (Document) MongoConfig.getMongoClient().getDatabase("bitirme").runCommand(new Document("$eval", cmd));

			return d;
		}
	}
}
